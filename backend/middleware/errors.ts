/**
 * Error Handling Middleware
 * Standardized error handling for API routes
 */

import { NextResponse } from 'next/server';

export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

/**
 * Error handler wrapper for API routes
 */
export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof ApiError) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: error.statusCode }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Validation error
 */
export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Not found error
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
