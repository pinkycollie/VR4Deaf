/**
 * Tests for DeafAUTH API routes
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/deafauth/route';

describe('DeafAUTH API', () => {
  describe('GET /api/deafauth', () => {
    it('should return not authenticated by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/deafauth');
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBe(null);
      expect(data.message).toBe('Not authenticated');
    });
  });

  describe('POST /api/deafauth', () => {
    it('should handle login action', async () => {
      const request = new NextRequest('http://localhost:3000/api/deafauth', {
        method: 'POST',
        body: JSON.stringify({ action: 'login' }),
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(501);
      expect(data.success).toBe(false);
    });

    it('should handle logout action', async () => {
      const request = new NextRequest('http://localhost:3000/api/deafauth', {
        method: 'POST',
        body: JSON.stringify({ action: 'logout' }),
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Logged out successfully');
    });

    it('should reject invalid action', async () => {
      const request = new NextRequest('http://localhost:3000/api/deafauth', {
        method: 'POST',
        body: JSON.stringify({ action: 'invalid' }),
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid action');
    });
  });
});
