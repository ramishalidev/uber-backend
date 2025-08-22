import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

(async () => {
  const methods = [
    { method: 'cash' as const, details: 'Cash on delivery' },
    { method: 'card' as const, details: 'Visa **** 1234' },
    { method: 'wallet' as const, details: 'In-app wallet' },
  ];

  for (const pm of methods) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.PAYMENT_METHODS,
      ID.unique(),
      pm
    );
  }
  console.log('Payment methods seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
