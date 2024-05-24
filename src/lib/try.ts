import { MongodbPersistence } from "y-mongodb-provider";

declare global {
  var persistence: MongodbPersistence | undefined;
}

const DB = process.env.DATABASE_URL || "";

export const persistence =
  globalThis.persistence ||
  new MongodbPersistence(DB, {
    collectionName: "nextnotes",
    flushSize: 100,
    multipleCollections: false,
  });

globalThis.persistence = persistence;
