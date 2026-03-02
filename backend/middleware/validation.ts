/**
 * Validation Middleware
 * Request validation using Zod schemas
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ValidationError } from './errors';

/**
 * Validates request body against Zod schema
 */
export function validateBody<T extends z.ZodType>(schema: T) {
  return async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validated = schema.parse(body);
      return validated as z.infer<T>;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        throw new ValidationError(messages.join(', '));
      }
      throw error;
    }
  };
}

/**
 * Validates query parameters against Zod schema
 */
export function validateQuery<T extends z.ZodType>(schema: T, searchParams: URLSearchParams) {
  try {
    const params = Object.fromEntries(searchParams.entries());
    return schema.parse(params) as z.infer<T>;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      throw new ValidationError(messages.join(', '));
    }
    throw error;
  }
}
