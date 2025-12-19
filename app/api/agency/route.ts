/**
 * Agency Management API
 * Manages VR agencies and service providers
 * 
 * GET /api/agency - List agencies
 * POST /api/agency - Create agency
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/backend/middleware';
import type { ApiResponse, Agency, PaginatedResponse } from '@/backend/types';

/**
 * GET - List agencies with pagination
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');
  
  // TODO: Implement agency listing from database
  
  const response: PaginatedResponse<Agency> = {
    success: true,
    data: [],
    pagination: {
      page,
      perPage,
      total: 0,
      totalPages: 0,
    },
  };
  
  return NextResponse.json(response);
});

/**
 * POST - Create new agency
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  
  // TODO: Implement agency creation
  // TODO: Validate required fields
  
  const response: ApiResponse = {
    success: true,
    message: 'Agency created successfully',
  };
  
  return NextResponse.json(response, { status: 201 });
});
