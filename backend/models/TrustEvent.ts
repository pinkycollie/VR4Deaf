/**
 * TrustEvent Model
 * Mongoose schema for FibonRose trust events
 */

// This is a placeholder for Mongoose model definition
// To be implemented when MongoDB connection is established

export interface TrustEventDocument {
  id: string;
  entityId: string;
  entityType: 'user' | 'agency' | 'employer' | 'service';
  eventType: 'accommodation_honored' | 'accommodation_violated' | 'service_provided' | 'milestone_reached';
  accommodationsHonored: boolean;
  details: Record<string, any>;
  timestamp: Date;
}

export interface TrustScoreDocument {
  entityId: string;
  entityType: string;
  score: number;
  eventsCount: number;
  badges: string[];
  lastUpdated: Date;
}

// TODO: Implement Mongoose schemas
// Example:
// import mongoose from 'mongoose';
// const TrustEventSchema = new mongoose.Schema({ ... });
// export const TrustEvent = mongoose.model('TrustEvent', TrustEventSchema);
// const TrustScoreSchema = new mongoose.Schema({ ... });
// export const TrustScore = mongoose.model('TrustScore', TrustScoreSchema);
