/**
 * Authentication Middleware
 * Handles DeafAUTH authentication and authorization
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseConfig } from '../config';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

/**
 * Verifies Supabase JWT token from request headers
 */
export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // TODO: Implement Supabase JWT verification
    // For now, return basic structure
    
    return null;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

/**
 * Middleware to require authentication
 */
export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const user = await verifyAuth(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Add user to request context
    return handler(request, user);
  };
}

/**
 * Middleware to require specific role
 */
export function requireRole(role: string, handler: Function) {
  return async (request: NextRequest) => {
    const user = await verifyAuth(request);
    
    if (!user || user.role !== role) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    return handler(request, user);
  };
}
