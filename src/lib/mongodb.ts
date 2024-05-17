import mongoose from "mongoose";

const DB_URI: string = process.env.NEXT_PUBLIC_DB_URI || "";

const connection: { isConnected?: number } = {};

export default async function connect() {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(DB_URI);
    if (db) {
      connection.isConnected = db.connections[0].readyState;
      console.log("Connected to MongoDB");
    } else {
      console.log("Failed to connect to MongoDB");
    }
  } catch (err) {
    console.log(err);
  }
}
