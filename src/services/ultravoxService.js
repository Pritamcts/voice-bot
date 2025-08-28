import https from 'https';
import { config, ultravoxCallConfig } from '../config/config.js';
import { logger } from '../utils/logger.js';

class UltravoxService {
    constructor() {
        this.apiUrl = `${config.ultravox.apiUrl}/calls`;
        this.apiKey = config.ultravox.apiKey;
    }

    async createCall(customPrompt = null) {
        logger.info('Creating Ultravox call...');
        
        const callConfig = {
            ...ultravoxCallConfig,
            ...(customPrompt && { systemPrompt: customPrompt })
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey
            }
        };

        return new Promise((resolve, reject) => {
            const request = https.request(this.apiUrl, requestOptions);
            let responseData = '';

            request.on('response', (response) => {
                response.on('data', chunk => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    try {
                        const parsedData = JSON.parse(responseData);
                        
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            logger.success('Ultravox call created successfully', {
                                callId: parsedData.callId,
                                joinUrl: parsedData.joinUrl ? '***PROVIDED***' : 'MISSING'
                            });
                            resolve(parsedData);
                        } else {
                            const error = new Error(`Ultravox API error (${response.statusCode}): ${responseData}`);
                            logger.error('❌ Ultravox API error', {
                                statusCode: response.statusCode,
                                response: responseData
                            });
                            reject(error);
                        }
                    } catch (parseError) {
                        const error = new Error(`Failed to parse Ultravox response: ${responseData}`);
                        logger.error('❌ Failed to parse Ultravox response', {
                            parseError: parseError.message,
                            rawResponse: responseData
                        });
                        reject(error);
                    }
                });
            });

            request.on('error', (error) => {
                logger.error('❌ Network error calling Ultravox', {
                    error: error.message
                });
                reject(new Error(`Network error calling Ultravox: ${error.message}`));
            });

            logger.debug('Sending Ultravox request', callConfig);
            request.write(JSON.stringify(callConfig));
            request.end();
        });
    }

    async getCallStatus(callId) {
        const url = `${this.apiUrl}/${callId}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'X-API-Key': this.apiKey
            }
        };

        return new Promise((resolve, reject) => {
            const request = https.request(url, requestOptions);
            let responseData = '';

            request.on('response', (response) => {
                response.on('data', chunk => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    try {
                        const parsedData = JSON.parse(responseData);
                        
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            resolve(parsedData);
                        } else {
                            reject(new Error(`Ultravox API error (${response.statusCode}): ${responseData}`));
                        }
                    } catch (parseError) {
                        reject(new Error(`Failed to parse Ultravox response: ${responseData}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(new Error(`Network error calling Ultravox: ${error.message}`));
            });

            request.end();
        });
    }
}

export default new UltravoxService();