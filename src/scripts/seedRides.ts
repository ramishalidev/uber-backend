import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

(async () => {
  const rides = [
    {
      origin_address: 'Kathmandu, Nepal',
      destination_address: 'Pokhara, Nepal',
      origin_latitude: 27.717245,
      origin_longitude: 85.323961,
      destination_latitude: 28.209583,
      destination_longitude: 83.985567,
      ride_time: 391 * 60,
      fare_price: 195.0,
      payment_status: 'paid' as const,
      drivers: null,
      riders: null,
    },
    {
      origin_address: 'Jalkot, MH',
      destination_address: 'Pune, Maharashtra, India',
      origin_latitude: 18.609116,
      origin_longitude: 77.165873,
      destination_latitude: 18.52043,
      destination_longitude: 73.856744,
      ride_time: 491 * 60,
      fare_price: 245.0,
      payment_status: 'paid' as const,
      drivers: null,
      riders: null,
    },
    {
      origin_address: 'Zagreb, Croatia',
      destination_address: 'Rijeka, Croatia',
      origin_latitude: 45.815011,
      origin_longitude: 15.981919,
      destination_latitude: 45.327063,
      destination_longitude: 14.442176,
      ride_time: 124 * 60,
      fare_price: 62.0,
      payment_status: 'failed' as const,
      drivers: null,
      riders: null,
    },
  ];

  for (const ride of rides) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.RIDES,
      ID.unique(),
      ride
    );
  }
  console.log('Rides seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});