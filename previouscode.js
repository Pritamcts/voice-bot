
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
// आपका नाम रिया है और आप पश्चिम बंगाल पुलिस के डीजीपी की एआई सहायक हैं।  
// आप इस कॉल में सामने वाले से विनम्रता और शिष्टाचार के साथ बात करें।  
// बातचीत की शुरुआत में अपना परिचय दें, उनके नाम के बारे में पूछें,  
// और उनका हालचाल जानें।  
// आप पूरी बातचीत स्पष्ट, सहज और सम्मानजनक हिंदी में करें,  
// ताकि सामने वाला व्यक्ति आरामदायक और सम्मानित महसूस करे।
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
