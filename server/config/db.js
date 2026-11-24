import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_URI = "mongodb+srv://delacruzrainjehanbscs2024_db_user:<db_password>@fluxdb.68bqaj3.mongodb.net/prepify?retryWrites=true&w=majority";

const getUri = () => process.env.MONGODB_URI || DEFAULT_URI;

export let client = null;
let isConnected = false;
let connectionPromise = null;

export async function connectToMongoDB() {
  const uri = getUri();
  try {
    if (!uri || uri.includes('<db_password>')) {
      console.warn('[MongoDB Warning] No valid MONGODB_URI found.');
      return null;
    }
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    await client.connect();
    isConnected = true;
    return client;
  } catch (err) {
    console.error("[MongoDB Error]", err);
    isConnected = false;
    return null;
  }
}

export async function disconnectFromMongoDB() {
  try {
    if (client) await client.close();
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  } finally {
    isConnected = false;
    client = null;
    connectionPromise = null;
  }
}

export async function connectDB() {
  const uri = getUri();
  if (!uri || uri.includes('<db_password>')) {
    isConnected = false;
    return false;
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
          bufferCommands: false,
        });
      }
      await connectToMongoDB();
      isConnected = true;
      return true;
    } catch (error) {
      isConnected = false;
      console.warn(`[MongoDB Warning] Could not connect to Atlas: ${error.message}`);
      return false;
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
}

export function getMongoStatus() {
  return Boolean(isConnected && mongoose.connection.readyState === 1);
}

export function getDatabase() {
  if (client) {
    return client.db('prepify');
  }
  return null;
}
