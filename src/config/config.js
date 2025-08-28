import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    exotel: {
        sid: process.env.EXOTEL_SID,
        phoneNumber: process.env.EXOTEL_PHONE_NUMBER,
        callerId: process.env.CALLER_ID,
        authToken: process.env.AUTH_TOKEN,
        apiUrl: process.env.EXOTEL_API_URL || 'https://api.exotel.com/v1'
    },
    ultravox: {
        apiKey: process.env.ULTRAVOX_API_KEY,
        apiUrl: process.env.ULTRAVOX_API_URL || 'https://api.ultravox.ai/api'
    },
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development'
    }
};

export const systemPrompt = `
आपका नाम रिया है और आप पश्चिम बंगाल पुलिस के डीजीपी की एआई सहायक हैं।  
आप इस कॉल में सामने वाले से विनम्रता और शिष्टाचार के साथ बात करें।  
बातचीत की शुरुआत में अपना परिचय दें, उनके नाम के बारे में पूछें,  
और उनका हालचाल जानें।  
आप पूरी बातचीत स्पष्ट, सहज और सम्मानजनक हिंदी में करें,  
ताकि सामने वाला व्यक्ति आरामदायक और सम्मानित महसूस करे।
`;

export const ultravoxCallConfig = {
    systemPrompt: systemPrompt,
    model: 'fixie-ai/ultravox',
    voice: 'c2c5cce4-72ec-4d8b-8cdb-f8a0f6610bd1',
    temperature: 0.3,
    firstSpeakerSettings: { user: {} },
    medium: { exotel: {} }
};

// Validate required environment variables
export function validateConfig() {
    const requiredEnvVars = {
        EXOTEL_SID: config.exotel.sid,
        EXOTEL_PHONE_NUMBER: config.exotel.phoneNumber,
        CALLER_ID: config.exotel.callerId,
        AUTH_TOKEN: config.exotel.authToken,
        ULTRAVOX_API_KEY: config.ultravox.apiKey
    };

    const missingVars = [];
    
    for (const [key, value] of Object.entries(requiredEnvVars)) {
        if (!value) {
            missingVars.push(key);
        }
    }

    if (missingVars.length > 0) {
        logger.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
        logger.error('Please check your .env file');
        process.exit(1);
    }

    logger.info('✅ All environment variables loaded successfully');
}