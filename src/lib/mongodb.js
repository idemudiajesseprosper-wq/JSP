import mongoose from "mongoose";

const globalCache = globalThis;
if (!globalCache.mongooseCache)
  globalCache.mongooseCache = { conn: null, promise: null };

export async function connectDB() {
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is not configured");
  if (globalCache.mongooseCache.conn) return globalCache.mongooseCache.conn;
  if (!globalCache.mongooseCache.promise) {
    globalCache.mongooseCache.promise = mongoose.connect(
      process.env.MONGODB_URI,
      { bufferCommands: false, serverSelectionTimeoutMS: 8000 },
    );
  }
  try {
    globalCache.mongooseCache.conn = await globalCache.mongooseCache.promise;
    return globalCache.mongooseCache.conn;
  } catch (error) {
    globalCache.mongooseCache.promise = null;
    globalCache.mongooseCache.conn = null;
    throw error;
  }
}
