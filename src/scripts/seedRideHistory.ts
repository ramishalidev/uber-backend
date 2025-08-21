import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID, Query } from 'node-appwrite';

dotenv.config();

(async () => {
  // Try to attach some history to up to 3 existing rides; otherwise create placeholder entries
  const rides = await databases.listDocuments(
    DATABASE_ID,
    COLLECTIONS.RIDES,
    [Query.limit(3)]
  );

  if (rides.documents.length > 0) {
    for (const r of rides.documents) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.RIDE_HISTORY,
        ID.unique(),
        {
          rides: r.$id,
          riders: null,
          drivers: null,
        }
      );
    }
  } else {
    // Fallback placeholder entries
    const entries = [1, 2, 3].map(() => ({
      rides: null,
      riders: null,
      drivers: null,
    }));
    for (const e of entries) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.RIDE_HISTORY,
        ID.unique(),
        e
      );
    }
  }
  console.log('Ride history seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});


