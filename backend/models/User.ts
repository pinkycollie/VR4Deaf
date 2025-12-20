/**
 * User Model
 * Mongoose schema for DeafAUTH user records
 */

// This is a placeholder for Mongoose model definition
// To be implemented when MongoDB connection is established

export interface UserDocument {
  id: string;
  email: string;
  name: string;
  disabilities?: string[];
  accommodations?: {
    visualNeeds: boolean;
    aslPreferred: boolean;
    captioningRequired: boolean;
    visualAlerts: boolean;
    customNeeds?: string[];
  };
  consents?: Array<{
    type: string;
    granted: boolean;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement Mongoose schema
// Example:
// import mongoose from 'mongoose';
// const UserSchema = new mongoose.Schema({ ... });
// export const User = mongoose.model('User', UserSchema);
