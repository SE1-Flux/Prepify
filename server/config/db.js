import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Atlas connection string
const DEFAULT_URI = "mongodb+srv://delacruzrainjehanbscs2024_db_user:<db_password>@fluxdb.68bqaj3.mongodb.net/prepify?retryWrites=true&w=majority";

const uri = process.env.MONGODB_URI || DEFAULT_URI;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

/**
 * Connect to MongoDB using native MongoClient as requested
 */
export async function connectToMongoDB() {
  try {
    if (uri.includes('<db_password>')) {
      console.warn('[MongoDB Warning] Please replace <db_password> with your actual MongoDB Atlas password in server/.env');
      return null;
    }
    await client.connect();
    await client.db('prepify').command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
    isConnected = true;
    return client;
  } catch (err) {
    console.error("[MongoDB Error]", err);
    isConnected = false;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  try {
    await client.close();
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  }
}

/**
 * Connects both Mongoose (for schemas/models) and native MongoClient
 */
export async function connectDB() {
  try {
    if (uri.includes('<db_password>')) {
      console.warn('-------------------------------------------------------------');
      console.warn('⚠️  [MongoDB Atlas Setup Required]');
      console.warn('👉 Replace "<db_password>" with your actual database user password');
      console.warn('   in: d:\\Downloads\\Prepify\\server\\.env');
      console.warn('⚡ Using In-Memory fallback mode for now so you can run the app immediately.');
      console.warn('-------------------------------------------------------------');
      isConnected = false;
      return;
    }

    // Connect Mongoose
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    // Connect native MongoClient
    await connectToMongoDB();
    
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to Atlas: fluxdb.68bqaj3.mongodb.net`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB Atlas: ${error.message}`);
    console.warn(`[MongoDB Notice] Falling back to In-Memory mode for local testing.`);
  }
}

export function getMongoStatus() {
  return isConnected;
}

export function getDatabase() {
  return client.db('prepify');
}
