import ultravoxService from '../services/ultravoxService.js';
import exotelService from '../services/exotelService.js';
import { logger } from '../utils/logger.js';

class CallController {
    async initiateCall(req, res) {
        const startTime = Date.now();
        const { phoneNumber, callerName } = req.validatedData;
        
        logger.info('Starting Voice AI Call Process', {
            phoneNumber,
            callerName,
            timestamp: new Date().toISOString()
        });

        try {
            // Step 1: Create Ultravox call
            const ultravoxResponse = await ultravoxService.createCall();
            
            if (!ultravoxResponse.joinUrl) {
                throw new Error('No joinUrl received from Ultravox API');
            }
            
            logger.success('Ultravox call created', {
                callId: ultravoxResponse.callId,
                hasJoinUrl: !!ultravoxResponse.joinUrl
            });

            // Step 2: Initiate Exotel call
            logger.info('Step 2: Initiating Exotel call...');
            
            let exotelResponse;
            let callMethod = 'unknown';
            
            try {
                // First try with streaming
                logger.info('Attempting call with streaming...');
                exotelResponse = await exotelService.initiateCallWithStreaming(
                    phoneNumber, 
                    ultravoxResponse.joinUrl
                );
                callMethod = 'streaming';
            } catch (streamingError) {
                logger.warn('Streaming method failed, trying basic call...', {
                    error: streamingError.message
                });
                
                // Fallback to basic call
                exotelResponse = await exotelService.initiateBasicCall(phoneNumber);
                callMethod = 'basic';
            }

            const processingTime = Date.now() - startTime;
            
            logger.success('Voice AI call initiated successfully!', {
                phoneNumber,
                callMethod,
                processingTimeMs: processingTime,
                exotelCallSid: exotelResponse.Call?.Sid || 'Not provided',
                ultravoxCallId: ultravoxResponse.callId
            });

            // Send success response
            res.status(200).json({
                success: true,
                message: 'Call initiated successfully',
                data: {
                    callId: exotelResponse.Call?.Sid || null,
                    phoneNumber: phoneNumber,
                    callerName: callerName,
                    callMethod: callMethod,
                    timestamp: new Date().toISOString(),
                    processingTimeMs: processingTime
                },
                ultravox: {
                    callId: ultravoxResponse.callId,
                    status: 'created'
                },
                exotel: {
                    callSid: exotelResponse.Call?.Sid || null,
                    status: exotelResponse.Call?.Status || 'unknown',
                    direction: exotelResponse.Call?.Direction || 'outbound-api'
                }
            });

        } catch (error) {
            const processingTime = Date.now() - startTime;
            
            logger.error('Voice AI call failed', {
                phoneNumber,
                callerName,
                error: error.message,
                processingTimeMs: processingTime,
                stack: error.stack
            });

            res.status(500).json({
                success: false,
                error: 'Call initiation failed',
                message: error.message,
                data: {
                    phoneNumber: phoneNumber,
                    callerName: callerName,
                    timestamp: new Date().toISOString(),
                    processingTimeMs: processingTime
                },
                troubleshooting: [
                    'Verify all environment variables are correctly set',
                    'Check that phone numbers are in E.164 format',
                    'Ensure Exotel account has sufficient balance',
                    'Verify Ultravox API key is valid',
                    'Check that caller ID is registered with Exotel',
                    'Ensure destination number can receive calls'
                ]
            });
        }
    }

    async getCallStatus(req, res) {
        const { callId } = req.params;
        
        if (!callId) {
            return res.status(400).json({
                success: false,
                error: 'Call ID is required'
            });
        }

        try {
            logger.info('Fetching call status', { callId });
            
            // Get status from both services
            const [ultravoxStatus, exotelStatus] = await Promise.allSettled([
                ultravoxService.getCallStatus(callId),
                exotelService.getCallStatus(callId)
            ]);

            const response = {
                success: true,
                callId: callId,
                timestamp: new Date().toISOString()
            };

            if (ultravoxStatus.status === 'fulfilled') {
                response.ultravox = ultravoxStatus.value;
            } else {
                response.ultravox = { error: ultravoxStatus.reason.message };
            }

            if (exotelStatus.status === 'fulfilled') {
                response.exotel = exotelStatus.value;
            } else {
                response.exotel = { error: exotelStatus.reason.message };
            }

            logger.success('Call status retrieved', { callId });
            res.json(response);

        } catch (error) {
            logger.error('Failed to get call status', {
                callId,
                error: error.message
            });

            res.status(500).json({
                success: false,
                error: 'Failed to get call status',
                message: error.message,
                callId: callId
            });
        }
    }

    async healthCheck(req, res) {
        res.json({
            success: true,
            service: 'voice-ai-call-service',
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0'
        });
    }
}

export default new CallController();