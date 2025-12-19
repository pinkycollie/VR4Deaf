/**
 * Tests for Magicians API routes
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/magicians/route';
import { GET as getJobMagician, POST as postJobMagician } from '@/app/api/magicians/job/route';

describe('Magicians API', () => {
  describe('GET /api/magicians', () => {
    it('should return list of all magicians', async () => {
      const request = new NextRequest('http://localhost:3000/api/magicians');
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeInstanceOf(Array);
      expect(data.data).toHaveLength(4);
      expect(data.data[0]).toHaveProperty('name');
      expect(data.data[0]).toHaveProperty('type');
      expect(data.data[0]).toHaveProperty('endpoint');
    });

    it('should include all four magicians', async () => {
      const request = new NextRequest('http://localhost:3000/api/magicians');
      const response = await GET(request);
      const data = await response.json();
      
      const types = data.data.map((m: any) => m.type);
      expect(types).toContain('job');
      expect(types).toContain('business');
      expect(types).toContain('developer');
      expect(types).toContain('creative');
    });
  });

  describe('Job Magician', () => {
    describe('GET /api/magicians/job', () => {
      it('should require clientId parameter', async () => {
        const request = new NextRequest('http://localhost:3000/api/magicians/job');
        const response = await getJobMagician(request);
        const data = await response.json();
        
        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBe('clientId required');
      });

      it('should return null profile when not found', async () => {
        const request = new NextRequest('http://localhost:3000/api/magicians/job?clientId=test123');
        const response = await getJobMagician(request);
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toBe(null);
        expect(data.message).toBe('No pathway profile found');
      });
    });

    describe('POST /api/magicians/job', () => {
      it('should handle get_recommendations action', async () => {
        const request = new NextRequest('http://localhost:3000/api/magicians/job', {
          method: 'POST',
          body: JSON.stringify({
            action: 'get_recommendations',
            clientId: 'test123',
            stage: 'explore',
          }),
        });
        
        const response = await postJobMagician(request);
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toHaveProperty('recommendations');
        expect(data.data).toHaveProperty('stage');
      });

      it('should handle update_stage action', async () => {
        const request = new NextRequest('http://localhost:3000/api/magicians/job', {
          method: 'POST',
          body: JSON.stringify({
            action: 'update_stage',
            clientId: 'test123',
            newStage: 'prepare',
          }),
        });
        
        const response = await postJobMagician(request);
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toBe('Pathway stage updated');
      });

      it('should reject invalid action', async () => {
        const request = new NextRequest('http://localhost:3000/api/magicians/job', {
          method: 'POST',
          body: JSON.stringify({
            action: 'invalid_action',
            clientId: 'test123',
          }),
        });
        
        const response = await postJobMagician(request);
        const data = await response.json();
        
        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBe('Invalid action');
      });
    });
  });
});
