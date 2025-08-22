import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

const riders = [
  {
    home_address: '123 Main St, Springfield',
    work_address: '456 Tech Ave, Silicon Valley',
    total_rides: 0,
    average_rating: 0,
    users: null,
    paymentMethod: null,
  },
  {
    home_address: '789 Elm St, Metropolis',
    total_rides: 2,
    average_rating: 4.5,
    users: null,
    paymentMethod: null,
  },
];

async function seedRiders() {
  for (const rider of riders) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.RIDERS,
      ID.unique(),
      rider
    );
  }
  console.log('Riders seeded');
}

seedRiders().catch((err) => {
  console.error(err);
  process.exit(1);
});