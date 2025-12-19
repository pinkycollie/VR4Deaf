/**
 * DeafAUTH - Authentication API
 * Source of truth for user identity and accommodations
 * 
 * GET /api/deafauth - Get current user
 * POST /api/deafauth/login - Login with Supabase
 * POST /api/deafauth/logout - Logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/backend/middleware';
import type { ApiResponse, User } from '@/backend/types';

/**
 * GET - Get current authenticated user
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  // TODO: Implement Supabase session verification
  // For now, return placeholder response
  
  const response: ApiResponse<User | null> = {
    success: true,
    data: null,
    message: 'Not authenticated',
  };
  
  return NextResponse.json(response);
});

/**
 * POST - Handle authentication actions
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { action } = body;
  
  if (action === 'login') {
    // TODO: Implement Supabase login
    const response: ApiResponse = {
      success: false,
      error: 'Authentication not yet implemented',
    };
    return NextResponse.json(response, { status: 501 });
  }
  
  if (action === 'logout') {
    // TODO: Implement Supabase logout
    const response: ApiResponse = {
      success: true,
      message: 'Logged out successfully',
    };
    return NextResponse.json(response);
  }
  
  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  );
});
