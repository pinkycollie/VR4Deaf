/**
 * Magicians API - Pathway Orchestration
 * Central router for all Four Magicians
 * 
 * GET /api/magicians - List available magicians
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/backend/middleware';
import type { ApiResponse } from '@/backend/types';

interface MagicianInfo {
  name: string;
  type: string;
  description: string;
  endpoint: string;
}

const MAGICIANS: MagicianInfo[] = [
  {
    name: 'Job Magician',
    type: 'job',
    description: 'Orchestrates VR, Workforce, employers, trainings, accommodations',
    endpoint: '/api/magicians/job',
  },
  {
    name: 'Business Magician',
    type: 'business',
    description: 'Orchestrates self-employment supports, small-business tools, revenue streams',
    endpoint: '/api/magicians/business',
  },
  {
    name: 'Developer Magician',
    type: 'developer',
    description: 'Orchestrates learning paths, tooling, credentials for tech growth',
    endpoint: '/api/magicians/developer',
  },
  {
    name: 'Creative Magician',
    type: 'creative',
    description: 'Orchestrates gear, platforms, audience growth, income models for creators',
    endpoint: '/api/magicians/creative',
  },
];

/**
 * GET - List all available magicians
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const response: ApiResponse<MagicianInfo[]> = {
    success: true,
    data: MAGICIANS,
  };
  
  return NextResponse.json(response);
});
