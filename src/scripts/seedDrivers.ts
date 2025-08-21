import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

(async () => {
  const drivers = [
    {
      rating: 4.8,
      background_check_status: 'passed' as const,
      background_check_expires_at: '2026-12-31T23:59:59.000Z',
      driver_license_number: 'DL123456789',
      license_expires_at: '2027-05-15T23:59:59.000Z',
      driver_license_image_id: null,
      car: null,
      user: null,
      paymentMethod: null,
    },
    {
      rating: 4.6,
      background_check_status: 'passed' as const,
      background_check_expires_at: '2026-11-30T23:59:59.000Z',
      driver_license_number: 'DL987654321',
      license_expires_at: '2027-08-20T23:59:59.000Z',
      driver_license_image_id: null,
      car: null,
      user: null,
      paymentMethod: null,
    },
    {
      rating: 4.1,
      background_check_status: 'pending' as const,
      driver_license_number: 'DL555555555',
      license_expires_at: '2027-03-10T23:59:59.000Z',
      driver_license_image_id: null,
      car: null,
      user: null,
      paymentMethod: null,
    },
  ];

  for (const driver of drivers) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.DRIVERS,
      ID.unique(),
      driver
    );
  }
  console.log('Drivers seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
