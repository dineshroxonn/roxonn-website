import { captureException } from '@sentry/nextjs';

export interface ErrorWithCode extends Error {
  code?: string;
  statusCode?: number;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: Error | AppError | unknown) => {
  if (error instanceof AppError) {
    // Operational errors - log but don't notify
    if (error.isOperational) {
      console.error(`[Operational Error] ${error.message}`, {
        code: error.code,
        statusCode: error.statusCode,
      });
      return;
    }
  }

  // Programming or unknown errors - notify and log
  console.error('[System Error]', error);
  captureException(error);

  // Here you can add additional error handling like:
  // - Graceful process shutdown
  // - Cleanup of resources
  // - Notification to admin
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const errorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export const createHttpError = (statusCode: number, message: string, code?: string): AppError => {
  return new AppError(message, code, statusCode);
};

// Common error creators
export const createNotFoundError = (message: string = 'Resource not found'): AppError => {
  return createHttpError(404, message, errorCodes.NOT_FOUND);
};

export const createValidationError = (message: string): AppError => {
  return createHttpError(400, message, errorCodes.VALIDATION_ERROR);
};

export const createUnauthorizedError = (message: string = 'Unauthorized'): AppError => {
  return createHttpError(401, message, errorCodes.UNAUTHORIZED);
};

export const createForbiddenError = (message: string = 'Forbidden'): AppError => {
  return createHttpError(403, message, errorCodes.FORBIDDEN);
};

export const createRateLimitError = (message: string = 'Too many requests'): AppError => {
  return createHttpError(429, message, errorCodes.RATE_LIMITED);
};
