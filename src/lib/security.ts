
/**
 * Security utilities for input validation and sanitization
 */

// Email header injection prevention
export const sanitizeEmailContent = (content: string): string => {
  // Remove potential email header injection characters
  return content
    .replace(/[\r\n]/g, '') // Remove line breaks
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/[%@]/g, '') // Remove potentially dangerous characters in email context
    .trim();
};

// Comprehensive input sanitization
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, maxLength) // Enforce length limit
    .trim();
};

// Enhanced email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

// Rate limiting helper (client-side basic implementation)
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = [];
  
  return (): boolean => {
    const now = Date.now();
    
    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] <= now - windowMs) {
      requests.shift();
    }
    
    // Check if we're at the limit
    if (requests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    requests.push(now);
    return true;
  };
};

// Content validation
export const validateFormContent = (data: {
  name: string;
  email: string;
  message: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Email validation
  if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Message validation
  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  if (data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
