

// import express from 'express';
// import dotenv from 'dotenv';
// import { validateConfig } from './src/config/config.js';
// import callRoutes from './src/routes/callRoutes.js';
// import { logger } from './src/utils/logger.js';


// dotenv.config();

// validateConfig();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/calls', callRoutes);

// app.get('/health', (req, res) => {
//     res.json({
//         status: 'healthy',
//         timestamp: new Date().toISOString(),
//         service: 'voice-ai-call-service'
//     });
// });

// app.use((error, req, res, next) => {
//     logger.error('Unhandled error:', error);
//     res.status(500).json({
//         success: false,
//         error: 'Internal server error',
//         message: error.message
//     });
// });

// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         error: 'Endpoint not found',
//         availableEndpoints: [
//             'POST /api/calls/initiate',
//             'GET /health'
//         ]
//     });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     logger.info(`🚀 Voice AI Call Service running on port ${PORT}`);
//     logger.info(`📋 Available endpoints:`);
//     logger.info(`   POST /api/calls/initiate - Initiate a voice call`);
//     logger.info(`   GET  /health - Health check`);
// });