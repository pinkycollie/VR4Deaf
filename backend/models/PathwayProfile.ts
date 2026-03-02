/**
 * PathwayProfile Model
 * Mongoose schema for user pathway profiles
 */

// This is a placeholder for Mongoose model definition
// To be implemented when MongoDB connection is established

export interface PathwayProfileDocument {
  clientId: string;
  pathwayType: 'job' | 'business' | 'developer' | 'creative';
  pathwayStage: string;
  goals: string[];
  accommodationsProfile: {
    visualNeeds: boolean;
    aslPreferred: boolean;
    captioningRequired: boolean;
    visualAlerts: boolean;
    customNeeds?: string[];
  };
  vrStatus?: string;
  progress?: {
    completedResources: string[];
    currentResources: string[];
    stageStartDate: Date;
    daysInStage: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement Mongoose schema
// Example:
// import mongoose from 'mongoose';
// const PathwayProfileSchema = new mongoose.Schema({ ... });
// export const PathwayProfile = mongoose.model('PathwayProfile', PathwayProfileSchema);
