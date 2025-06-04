export const MAX_MESSAGE_LENGTH = 1000;
export const MIN_MESSAGE_LENGTH = 1;

export type ValidationResult = {
  isValid: boolean;
  error?: string;
  sanitizedInput: string;
};

export const sanitizeInput = (input: string): ValidationResult => {
  if (input.length < MIN_MESSAGE_LENGTH) {
    return {
      isValid: false,
      error: 'Message cannot be empty',
      sanitizedInput: input,
    };
  }

  if (input.length > MAX_MESSAGE_LENGTH) {
    return {
      isValid: false,
      error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      sanitizedInput: input,
    };
  }

  // Remove any HTML tags
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  // Remove any script tags or javascript: URLs
  const withoutScripts = withoutHtml.replace(/javascript:/gi, '');
  // Remove any potential XSS payloads
  const withoutXSS = withoutScripts.replace(/on\w+=/gi, '');

  return {
    isValid: true,
    sanitizedInput: withoutXSS,
  };
};
