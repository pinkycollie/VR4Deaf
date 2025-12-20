/**
 * Database Configuration
 * Manages MongoDB connection and configuration
 */

export const databaseConfig = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vr4deaf',
    options: {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
};

export default databaseConfig;
