// Basic error monitoring and reporting functionality

/**
 * Captures and logs an error with additional context
 */
export function captureError(error: Error, context?: Record<string, any>) {
  // In development, log to console
  console.error('Error captured:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
  });

  // TODO: In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or your preferred monitoring solution
}

/**
 * Captures and logs an exception with additional context
 */
export function captureException(error: unknown, context?: Record<string, any>) {
  if (error instanceof Error) {
    captureError(error, context);
  } else {
    captureError(new Error(String(error)), context);
  }
}

/**
 * Logs a message with optional context
 */
export function log(message: string, context?: Record<string, any>) {
  console.log(message, context);
  // TODO: In production, you might want to send this to a logging service
}
