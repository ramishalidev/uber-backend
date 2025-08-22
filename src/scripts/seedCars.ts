import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

(async () => {
  const cars = [
    {
      vehicle_plate: 'UBR-2024',
      vehicle_model: 'Toyota Camry',
      vehicle_year: 2022,
      car_seats: 4,
      insurance_expires_at: '2026-09-30T23:59:59.000Z',
      car_image_id: null,
      driver: null,
    },
    {
      vehicle_plate: 'UBR-2025',
      vehicle_model: 'Honda Accord',
      vehicle_year: 2023,
      car_seats: 5,
      insurance_expires_at: '2026-12-01T23:59:59.000Z',
      car_image_id: null,
      driver: null,
    },
  ];

  for (const car of cars) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.CARS,
      ID.unique(),
      car
    );
  }
  console.log('Cars seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
