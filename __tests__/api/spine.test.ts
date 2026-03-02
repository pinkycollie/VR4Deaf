/**
 * Tests for PinkSync and FibonRose API routes
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getPinkSync, POST as postPinkSync } from '@/app/api/pinksync/route';
import { GET as getFibonRose, POST as postFibonRose } from '@/app/api/fibonrose/route';

describe('PinkSync API', () => {
  describe('GET /api/pinksync', () => {
    it('should return sync status', async () => {
      const request = new NextRequest('http://localhost:3000/api/pinksync');
      const response = await getPinkSync(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('status');
      expect(data.data.status).toBe('active');
    });
  });

  describe('POST /api/pinksync', () => {
    it('should trigger sync event', async () => {
      const request = new NextRequest('http://localhost:3000/api/pinksync', {
        method: 'POST',
        body: JSON.stringify({
          sourceSystem: 'deafauth',
          targetSystems: ['magicians'],
          eventType: 'user_updated',
          payload: { userId: 'test123' },
        }),
      });
      
      const response = await postPinkSync(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id');
      expect(data.data).toHaveProperty('status');
      expect(data.data.status).toBe('pending');
      expect(data.message).toBe('Sync event queued');
    });
  });
});

describe('FibonRose API', () => {
  describe('GET /api/fibonrose', () => {
    it('should return trust events by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/fibonrose');
      const response = await getFibonRose(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeInstanceOf(Array);
    });

    it('should return trust score when requested', async () => {
      const request = new NextRequest('http://localhost:3000/api/fibonrose?entityId=test123&type=score');
      const response = await getFibonRose(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('entityId');
      expect(data.data).toHaveProperty('score');
      expect(data.data).toHaveProperty('eventsCount');
      expect(data.data).toHaveProperty('badges');
    });
  });

  describe('POST /api/fibonrose', () => {
    it('should log trust event', async () => {
      const request = new NextRequest('http://localhost:3000/api/fibonrose', {
        method: 'POST',
        body: JSON.stringify({
          entityId: 'agency123',
          entityType: 'agency',
          eventType: 'accommodation_honored',
          accommodationsHonored: true,
          details: { service: 'counseling' },
        }),
      });
      
      const response = await postFibonRose(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id');
      expect(data.data).toHaveProperty('entityId');
      expect(data.data.entityId).toBe('agency123');
      expect(data.data.accommodationsHonored).toBe(true);
      expect(data.message).toBe('Trust event logged');
    });
  });
});
