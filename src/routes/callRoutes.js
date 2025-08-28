import express from 'express';
import callController from '../controllers/callController.js';
import { validateInitiateCallRequest } from '../middleware/validation.js';

const router = express.Router();

// Route to initiate a voice call
router.post('/initiate', validateInitiateCallRequest, callController.initiateCall);

// Route to get call status
router.get('/status/:callId', callController.getCallStatus);

// Route for service health check
router.get('/health', callController.healthCheck);

export default router;