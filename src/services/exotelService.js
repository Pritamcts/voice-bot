import https from "https";
import { config } from "../config/config.js";
import { logger } from "../utils/logger.js";

class ExotelService {
  constructor() {
    this.apiUrl = `${config.exotel.apiUrl}/Accounts/${config.exotel.sid}/Calls/connect.json`;
    this.authToken = config.exotel.authToken;
    this.fromNumber = config.exotel.phoneNumber;
    this.callerId = config.exotel.callerId;
  }

  async initiateCall(destinationNumber, streamUrl = null) {
    logger.info("📞Initiating Exotel call...", {
      to: destinationNumber,
      from: this.fromNumber,
      callerId: this.callerId,
      hasStreamUrl: !!streamUrl,
    });

    const formData = new URLSearchParams({
      From: this.fromNumber,
      To: destinationNumber,
      CallerId: this.callerId,
    });

    // Add streaming URL if provided
    if (streamUrl) {
      const appml = this._createStreamingAppML(streamUrl);
      formData.append(
        "Url",
        `data:application/xml,${encodeURIComponent(appml)}`
      );
      formData.append("Method", "GET");
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this.authToken}`,
        Accept: "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const request = https.request(this.apiUrl, requestOptions);
      let responseData = "";

      request.on("response", (response) => {
        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          try {
            let parsedData;
            try {
              parsedData = JSON.parse(responseData);
            } catch (parseError) {
              // If JSON parsing fails, return raw response
              parsedData = {
                statusCode: response.statusCode,
                rawResponse: responseData,
              };
            }

            if (response.statusCode >= 200 && response.statusCode < 300) {
              logger.success("Exotel call initiated successfully", {
                statusCode: response.statusCode,
                callSid: parsedData.Call?.Sid || "Not provided",
                status: parsedData.Call?.Status || "Unknown",
              });
              resolve(parsedData);
            } else {
              const error = new Error(
                `Exotel API error (${response.statusCode}): ${responseData}`
              );
              logger.error("Exotel API error", {
                statusCode: response.statusCode,
                response: responseData,
              });
              reject(error);
            }
          } catch (error) {
            logger.error("Failed to process Exotel response", {
              error: error.message,
              rawResponse: responseData,
            });
            reject(
              new Error(`Failed to process Exotel response: ${responseData}`)
            );
          }
        });
      });

      request.on("error", (error) => {
        logger.error("Network error calling Exotel", {
          error: error.message,
        });
        reject(new Error(`Network error calling Exotel: ${error.message}`));
      });

      logger.debug("Sending Exotel request", {
        url: this.apiUrl,
        formData: formData.toString(),
      });

      request.write(formData.toString());
      request.end();
    });
  }

  async initiateCallWithStreaming(destinationNumber, streamUrl) {
    logger.info("Attempting call with streaming...");
    return this.initiateCall(destinationNumber, streamUrl);
  }

  async initiateBasicCall(destinationNumber) {
    logger.info("Attempting basic call...");
    return this.initiateCall(destinationNumber);
  }

  _createStreamingAppML(streamUrl) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Stream url="${streamUrl}"/>
</Response>`;
  }

  async getCallStatus(callSid) {
    const url = `${config.exotel.apiUrl}/Accounts/${config.exotel.sid}/Calls/${callSid}.json`;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${this.authToken}`,
        Accept: "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const request = https.request(url, requestOptions);
      let responseData = "";

      request.on("response", (response) => {
        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          try {
            const parsedData = JSON.parse(responseData);

            if (response.statusCode >= 200 && response.statusCode < 300) {
              resolve(parsedData);
            } else {
              reject(
                new Error(
                  `Exotel API error (${response.statusCode}): ${responseData}`
                )
              );
            }
          } catch (parseError) {
            reject(
              new Error(`Failed to parse Exotel response: ${responseData}`)
            );
          }
        });
      });

      request.on("error", (error) => {
        reject(new Error(`Network error calling Exotel: ${error.message}`));
      });

      request.end();
    });
  }
}

export default new ExotelService();
