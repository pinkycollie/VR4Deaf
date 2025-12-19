/**
 * Resource Model
 * Mongoose schema for resource directory
 */

// This is a placeholder for Mongoose model definition
// To be implemented when MongoDB connection is established

export interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  pathwayTypes: Array<'job' | 'business' | 'developer' | 'creative'>;
  stages: string[];
  vrCoverage: boolean;
  accessTags: string[];
  url?: string;
  provider?: string;
  cost?: number;
  durationHours?: number;
  trustScore?: number;
  completionRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement Mongoose schema
// Example:
// import mongoose from 'mongoose';
// const ResourceSchema = new mongoose.Schema({ ... });
// export const Resource = mongoose.model('Resource', ResourceSchema);
