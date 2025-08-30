












// import express from 'express';
// import https from 'https';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json());

// const {
//   EXOTEL_SID,
//   EXOTEL_PHONE_NUMBER,
//   DESTINATION_PHONE_NUMBER,
//   CALLER_ID,
//   AUTH_TOKEN,
//   ULTRAVOX_API_KEY,
//   ULTRAVOX_API_URL
// } = process.env;

// // ✅ Ensure env vars exist
// const requiredEnvVars = {
//   EXOTEL_SID,
//   EXOTEL_PHONE_NUMBER,
//   DESTINATION_PHONE_NUMBER,
//   CALLER_ID,
//   AUTH_TOKEN,
//   ULTRAVOX_API_KEY,
//   ULTRAVOX_API_URL
// };

// for (const [key, value] of Object.entries(requiredEnvVars)) {
//   if (!value) {
//     console.error(`Missing required environment variable: ${key}`);
//     process.exit(1);
//   }
// }

// const SYSTEM_PROMPT = `
// Hi, you are Riya, the AI assistant tou can speak casually.
// `;

// // const ULTRAVOX_CALL_CONFIG = {
// //   systemPrompt: SYSTEM_PROMPT,
// //   model: 'fixie-ai/ultravox',
// //   voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
// //   temperature: 0.3,
// //   firstSpeakerSettings: { user: {} },   // ✅ user speaks first for outbound
// //   medium: {
// //     exotel: {
// //       accountSid: EXOTEL_SID,
// //       callerId: CALLER_ID,
// //       from: EXOTEL_PHONE_NUMBER,
// //       to: DESTINATION_PHONE_NUMBER,
// //       authToken: AUTH_TOKEN
// //     }
// //   }
// // };


// const ULTRAVOX_CALL_CONFIG = {
//   systemPrompt: SYSTEM_PROMPT,
//   model: 'fixie-ai/ultravox',
//   voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
//   temperature: 0.3,
//   firstSpeakerSettings: { user: {} },   // outbound, user speaks first
//   medium: { exotel: {} }                 // ✅ let Ultravox handle Exotel details
// };


// // ✅ Create Ultravox call (no manual Exotel step needed)
// async function createUltravoxCall() {
//   const request = https.request(`${ULTRAVOX_API_URL}/calls`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-API-Key': ULTRAVOX_API_KEY
//     }
//   });

//   return new Promise((resolve, reject) => {
//     let data = '';
//     request.on('response', (response) => {
//       response.on('data', chunk => (data += chunk));
//       response.on('end', () => {
//         try {
//           const parsedData = JSON.parse(data);
//           if (response.statusCode >= 200 && response.statusCode < 300) {
//             resolve(parsedData);
//           } else {
//             reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`));
//           }
//         } catch (error) {
//           reject(new Error(`Failed to parse Ultravox response: ${data}`));
//         }
//       });
//     });
//     request.on('error', (error) => {
//       reject(new Error(`Network error calling Ultravox: ${error.message}`));
//     });
//     request.write(JSON.stringify(ULTRAVOX_CALL_CONFIG));
//     request.end();
//   });
// }

// // ✅ API endpoint to initiate call
// app.post('/initiate-call', async (req, res) => {
//   console.log('📞 Starting Outbound Ultravox + Exotel call...\n');

//   try {
//     const ultravoxResponse = await createUltravoxCall();

//     console.log('✅ Ultravox call created:', JSON.stringify(ultravoxResponse, null, 2));

//     res.json({
//       success: true,
//       message: 'Call initiated via Ultravox + Exotel',
//       ultravoxResponse
//     });
//   } catch (error) {
//     console.error('❌ Error:', error);

//     res.status(500).json({
//       success: false,
//       error: error.message,
//       troubleshooting: [
//         'Check Exotel credentials in .env',
//         'Ensure numbers are in E.164 format (+91...)',
//         'Verify Exotel account balance',
//         'Confirm Caller ID is registered in Exotel',
//         'Ensure Ultravox API key is valid'
//       ]
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`➡️ POST /initiate-call to start a call`);
// });



//##############################################################################



// import express from 'express';
// import https from 'https';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json());
// const EXOTEL_SID = process.env.EXOTEL_SID;
// const EXOTEL_PHONE_NUMBER = process.env.EXOTEL_PHONE_NUMBER;
// const DESTINATION_PHONE_NUMBER = process.env.DESTINATION_PHONE_NUMBER;
// const CALLER_ID = process.env.CALLER_ID;
// const AUTH_TOKEN = process.env.AUTH_TOKEN;
// const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;
// const requiredEnvVars = {
//     EXOTEL_SID,
//     EXOTEL_PHONE_NUMBER,
//     DESTINATION_PHONE_NUMBER,
//     CALLER_ID,
//     AUTH_TOKEN,
//     ULTRAVOX_API_KEY
// };

// for (const [key, value] of Object.entries(requiredEnvVars)) {
//     if (!value) {
//         console.error(`Missing required environment variable: ${key}`);
//         process.exit(1);
//     }
// }



// const SYSTEM_PROMPT = `
// Hello, You are riya a voice agen.
// `;

// const ULTRAVOX_CALL_CONFIG = {
//     systemPrompt: SYSTEM_PROMPT,
//     model: 'fixie-ai/ultravox',
//     voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
//     temperature: 0.3,
//     firstSpeakerSettings: { user: {} },
//     medium: { exotel: {} }
// };

// // Creates the Ultravox call using the above config
// async function createUltravoxCall() {
//     const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls';
//     const request = https.request(ULTRAVOX_API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-API-Key': ULTRAVOX_API_KEY
//         }
//     });

//     return new Promise((resolve, reject) => {
//         let data = '';
//         request.on('response', (response) => {
//             response.on('data', chunk => data += chunk);
//             response.on('end', () => {
//                 try {
//                     const parsedData = JSON.parse(data);
//                     if (response.statusCode >= 200 && response.statusCode < 300) {
//                         resolve(parsedData);
//                     } else {
//                         reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`));
//                     }
//                 } catch (parseError) {
//                     reject(new Error(`Failed to parse Ultravox response: ${data}`));
//                 }
//             });
//         });
//         request.on('error', (error) => {
//             reject(new Error(`Network error calling Ultravox: ${error.message}`));
//         });
//         request.write(JSON.stringify(ULTRAVOX_CALL_CONFIG));
//         request.end();
//     });
// }

// // Creates an Exotel call using their REST API with your specific format
// async function createExotelCall(streamUrl) {
//     const EXOTEL_API_URL = `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`;
    
//     const formData = new URLSearchParams({
//         From: EXOTEL_PHONE_NUMBER,
//         To: DESTINATION_PHONE_NUMBER,
//         CallerId: CALLER_ID,
//     }).toString();

//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${AUTH_TOKEN}`,
//             'Accept': 'application/json'
//         }
//     };

//     const request = https.request(EXOTEL_API_URL, options);

//     return new Promise((resolve, reject) => {
//         let data = '';
//         request.on('response', (response) => {
//             response.on('data', chunk => data += chunk);
//             response.on('end', () => {
//                 try {
//                     let parsedData;
//                     try {
//                         parsedData = JSON.parse(data);
//                     } catch (parseError) {
//                         parsedData = { statusCode: response.statusCode, body: data };
//                     }
                    
//                     if (response.statusCode >= 200 && response.statusCode < 300) {
//                         resolve(parsedData);
//                     } else {
//                         reject(new Error(`Exotel API error (${response.statusCode}): ${data}`));
//                     }
//                 } catch (error) {
//                     reject(new Error(`Failed to process Exotel response: ${data}`));
//                 }
//             });
//         });
//         request.on('error', (error) => {
//             reject(new Error(`Network error calling Exotel: ${error.message}`));
//         });
//         request.write(formData);
//         request.end();
//     });
// }

// // Enhanced version with AppML for streaming (if needed)
// async function createExotelCallWithStreaming(streamUrl) {
//     const EXOTEL_API_URL = `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`;
    
//     const appml = `<?xml version="1.0" encoding="UTF-8"?>
// <Response>
//     <Stream url="${streamUrl}"/>
// </Response>`;

//     const formData = new URLSearchParams({
//         From: EXOTEL_PHONE_NUMBER,
//         To: DESTINATION_PHONE_NUMBER,
//         CallerId: CALLER_ID,
//         Url: `data:application/xml,${encodeURIComponent(appml)}`,
//         Method: 'GET'
//     }).toString();

//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${AUTH_TOKEN}`,
//             'Accept': 'application/json'
//         }
//     };

//     const request = https.request(EXOTEL_API_URL, options);

//     return new Promise((resolve, reject) => {
//         let data = '';
//         request.on('response', (response) => {
//             response.on('data', chunk => data += chunk);
//             response.on('end', () => {
//                 try {
//                     let parsedData;
//                     try {
//                         parsedData = JSON.parse(data);
//                     } catch (parseError) {
//                         parsedData = { statusCode: response.statusCode, body: data };
//                     }
                    
//                     if (response.statusCode >= 200 && response.statusCode < 300) {
//                         resolve(parsedData);
//                     } else {
//                         reject(new Error(`Exotel API error (${response.statusCode}): ${data}`));
//                     }
//                 } catch (error) {
//                     reject(new Error(`Failed to process Exotel response: ${data}`));
//                 }
//             });
//         });
//         request.on('error', (error) => {
//             reject(new Error(`Network error calling Exotel: ${error.message}`));
//         });
//         request.write(formData);
//         request.end();
//     });
// }

// app.post('/initiate-call', async (req, res) => {
//     console.log('Starting Outbound Ultravox Voice AI Phone Call with Exotel...\n');
    
//     try {
//         console.log('Creating Ultravox call...');
//         const ultravoxResponse = await createUltravoxCall();
        
//         if (!ultravoxResponse.joinUrl) {
//             throw new Error('No joinUrl received from Ultravox API');
//         }
        
//         console.log('Got Ultravox joinUrl:', ultravoxResponse.joinUrl);

//         console.log('Initiating Exotel call...');
        
//         let callResponse;
//         try {
//             console.log('Attempting call with streaming...');
//             callResponse = await createExotelCallWithStreaming(ultravoxResponse.joinUrl);
//         } catch (error) {
//             console.log('Streaming method failed, trying basic call...');
//             console.log('Error details:', error.message);
//             callResponse = await createExotelCall(ultravoxResponse.joinUrl);
//         }

//         console.log('Exotel outbound phone call initiated successfully!');
//         console.log('all Response:', JSON.stringify(callResponse, null, 2));
//         console.log(`Calling ${DESTINATION_PHONE_NUMBER} from ${EXOTEL_PHONE_NUMBER} with CallerID ${CALLER_ID}`);
        
//         res.json({
//             success: true,
//             message: 'Call initiated successfully',
//             callResponse: callResponse,
//             ultravoxResponse: ultravoxResponse
//         });
        
//     } catch (error) {
//         console.error('Error occurred:');
//         console.error('Full error details:', error);
        
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             troubleshooting: [
//                 'Double-check all Exotel configuration values in .env file',
//                 'Ensure phone numbers are in E.164 format (+91234567890)',
//                 'Verify your Exotel account has sufficient balance',
//                 'Check that your Ultravox API key is valid',
//                 'Verify the authorization token matches your Exotel credentials',
//                 'Ensure the caller ID is registered with your Exotel account'
//             ]
//         });
//     }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`POST /initiate-call to start a call`);
// });




// This is exotell V3 api call


// import express from 'express';
// import https from 'https';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json());

// // ENV variables
// const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY 
// const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN 
// const EXOTEL_SID = process.env.EXOTEL_SID
// const EXOTEL_SUBDOMAIN = process.env.EXOTEL_SUBDOMAIN || "api.exotel.com";  // Singapore: ccm-api.exotel.com, Mumbai: ccm-api.in.exotel.com
// const DESTINATION_PHONE_NUMBER = process.env.DESTINATION_PHONE_NUMBER
// const EXOTEL_PHONE_NUMBER = process.env.EXOTEL_PHONE_NUMBER
// const CALLER_ID = process.env.CALLER_ID 

// const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;

// // ---------------- Ultravox Config ----------------
// const SYSTEM_PROMPT = `Hello, You are riya a voice agent.`;

// const ULTRAVOX_CALL_CONFIG = {
//   systemPrompt: SYSTEM_PROMPT,
//   model: 'fixie-ai/ultravox',
//   voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
//   temperature: 0.3,
//   firstSpeakerSettings: { user: {} },
//   medium: { exotel: {} }
// };

// // ---------------- Ultravox Call ----------------
// async function createUltravoxCall() {
//   const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls';

//   return new Promise((resolve, reject) => {
//     const request = https.request(ULTRAVOX_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-API-Key': ULTRAVOX_API_KEY
//       }
//     });

//     let data = '';
//     request.on('response', (response) => {
//       response.on('data', chunk => data += chunk);
//       response.on('end', () => {
//         try {
//           const parsedData = JSON.parse(data);
//           if (response.statusCode >= 200 && response.statusCode < 300) {
//             resolve(parsedData);
//           } else {
//             reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`));
//           }
//         } catch (err) {
//           reject(new Error(`Failed to parse Ultravox response: ${data}`));
//         }
//       });
//     });

//     request.on('error', (err) => reject(err));
//     request.write(JSON.stringify(ULTRAVOX_CALL_CONFIG));
//     request.end();
//   });
// }

// // ---------------- Exotel v3 Call ----------------
// async function createExotelV3Call(streamUrl) {
//   const EXOTEL_API_URL = `https://${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}@${EXOTEL_SUBDOMAIN}/v3/accounts/${EXOTEL_SID}/calls`;

//   const payload = {
//     from: { contact_uri: EXOTEL_PHONE_NUMBER, state_management: true },
//     to: { contact_uri: DESTINATION_PHONE_NUMBER },
//     recording: { record: true, channels: "single" },
//     virtual_number: CALLER_ID,
//     max_time_limit: 4000,
//     attempt_time_out: 45,
//     custom_field: "ultravox_exotel_call",
//     // status_callback: [
//     //   {
//     //     event: "terminal",
//     //     url: "https://webhook.site/aecd85dc-f959-48b5-abaf-d45189037e09"
//     //   }
//     // ],
//     stream: { url: streamUrl }  // Attach Ultravox joinUrl
//   };

//   return new Promise((resolve, reject) => {
//     const req = https.request(EXOTEL_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }
//     });

//     let data = '';
//     req.on('response', (res) => {
//       res.on('data', chunk => data += chunk);
//       res.on('end', () => {
//         try {
//           const parsed = JSON.parse(data);
//           if (res.statusCode >= 200 && res.statusCode < 300) {
//             resolve(parsed);
//           } else {
//             reject(new Error(`Exotel v3 API error (${res.statusCode}): ${data}`));
//           }
//         } catch (err) {
//           reject(new Error(`Failed to parse Exotel v3 response: ${data}`));
//         }
//       });
//     });

//     req.on('error', (err) => reject(err));
//     req.write(JSON.stringify(payload));
//     req.end();
//   });
// }

// // ---------------- API Route ----------------
// app.post('/initiate-call', async (req, res) => {
//   console.log('🚀 Starting Outbound Ultravox + Exotel v3 Call...');
//   try {
//     const ultravoxResponse = await createUltravoxCall();
//     if (!ultravoxResponse.joinUrl) throw new Error("No joinUrl from Ultravox");

//     console.log("Ultravox joinUrl:", ultravoxResponse.joinUrl);

//     const exotelResponse = await createExotelV3Call(ultravoxResponse.joinUrl);

//     res.json({
//       success: true,
//       message: "Call initiated successfully (Exotel v3)",
//       exotelResponse,
//       ultravoxResponse
//     });

//   } catch (err) {
//     console.error("❌ Error:", err.message);
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// // ---------------- Server ----------------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`POST /initiate-call to trigger call`);
// });


// #############################################################################




import express from 'express';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// ENV variables
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN;
const EXOTEL_SID = process.env.EXOTEL_SID;
const EXOTEL_SUBDOMAIN = process.env.EXOTEL_SUBDOMAIN || "api.exotel.com"; // Singapore: ccm-api.exotel.com, Mumbai: ccm-api.in.exotel.com
const DESTINATION_PHONE_NUMBER = process.env.DESTINATION_PHONE_NUMBER;
const EXOTEL_PHONE_NUMBER = process.env.EXOTEL_PHONE_NUMBER;
const CALLER_ID = process.env.CALLER_ID;

const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;

// ---------------- Ultravox Config ----------------
const SYSTEM_PROMPT = `Hello, You are riya a voice agent.`;

const ULTRAVOX_CALL_CONFIG = {
  systemPrompt: SYSTEM_PROMPT,
  model: 'fixie-ai/ultravox',
  voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
  temperature: 0.3,
  firstSpeakerSettings: { user: {} },
  medium: { exotel: {} }
};

// ---------------- Ultravox Call ----------------
async function createUltravoxCall() {
  const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls';

  return new Promise((resolve, reject) => {
    const request = https.request(ULTRAVOX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ULTRAVOX_API_KEY
      }
    });

    let data = '';
    request.on('response', (response) => {
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(parsedData);
          } else {
            reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`));
          }
        } catch (err) {
          reject(new Error(`Failed to parse Ultravox response: ${data}`));
        }
      });
    });

    request.on('error', (err) => reject(err));
    request.write(JSON.stringify(ULTRAVOX_CALL_CONFIG));
    request.end();
  });
}

// ---------------- Exotel v2 Call ----------------
async function createExotelV2Call(streamUrl) {
  const EXOTEL_API_URL = `https://${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}@${EXOTEL_SUBDOMAIN}/v2/accounts/${EXOTEL_SID}/calls`;

  const payload = {
    from: {
      user_contact_uri: EXOTEL_PHONE_NUMBER
    },
    to: {
      customer_contact_uri: DESTINATION_PHONE_NUMBER
    },
    virtual_number: CALLER_ID,
    recording: true,
    // attach Ultravox stream
    stream: {
      url: streamUrl
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(EXOTEL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    let data = '';
    req.on('response', (res) => {
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`Exotel v2 API error (${res.statusCode}): ${data}`));
          }
        } catch (err) {
          reject(new Error(`Failed to parse Exotel v2 response: ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(JSON.stringify(payload));
    req.end();
  });
}

// ---------------- API Route ----------------
app.post('/initiate-call', async (req, res) => {
  console.log('🚀 Starting Outbound Ultravox + Exotel v2 Call...');
  try {
    const ultravoxResponse = await createUltravoxCall();
    if (!ultravoxResponse.joinUrl) throw new Error("No joinUrl from Ultravox");

    console.log("Ultravox joinUrl:", ultravoxResponse.joinUrl);

    const exotelResponse = await createExotelV2Call(ultravoxResponse.joinUrl);

    res.json({
      success: true,
      message: "Call initiated successfully (Exotel v2)",
      exotelResponse,
      ultravoxResponse
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ---------------- Server ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`POST /initiate-call to trigger call`);
});



