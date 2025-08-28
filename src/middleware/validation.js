import { logger } from '../utils/logger.js';

export function validatePhoneNumber(phoneNumber) {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    
    if (!phoneNumber) {
        return { isValid: false, error: 'Phone number is required' };
    }
    
    if (typeof phoneNumber !== 'string') {
        return { isValid: false, error: 'Phone number must be a string' };
    }
    
    // Remove any whitespace
    const cleanNumber = phoneNumber.trim();
    
    if (!e164Regex.test(cleanNumber)) {
        return { 
            isValid: false, 
            error: 'Phone number must be in E.164 format (e.g., +918967648122)' 
        };
    }
    
    if (cleanNumber.startsWith('+91')) {
        const numberPart = cleanNumber.slice(3);
        if (numberPart.length !== 10) {
            return { 
                isValid: false, 
                error: 'Indian phone numbers must have exactly 10 digits after +91' 
            };
        }
    }
    
    return { isValid: true, phoneNumber: cleanNumber };
}

export function validateInitiateCallRequest(req, res, next) {
    const { phoneNumber, callerName } = req.body;
    
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
        logger.warn('Invalid phone number provided', { 
            phoneNumber, 
            error: phoneValidation.error 
        });
        
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: phoneValidation.error,
            example: {
                phoneNumber: '+918967648122',
                callerName: 'Optional caller name'
            }
        });
    }
    
    if (callerName && typeof callerName !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: 'callerName must be a string if provided'
        });
    }
    
    req.validatedData = {
        phoneNumber: phoneValidation.phoneNumber,
        callerName: callerName ? callerName.trim() : null
    };
    
    logger.debug('Request validation passed', req.validatedData);
    next();
}