import dotenv from 'dotenv';
import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { ID } from 'node-appwrite';

dotenv.config();

(async () => {
  const users = [
    {
      user_id: ID.unique(),
      role: 'driver' as const,
      first_name: 'James',
      last_name: 'Wilson',
      phone: '+15551111111',
      email: 'james@example.com',
      profile_image_id: null,
    },
    {
      user_id: ID.unique(),
      role: 'driver' as const,
      first_name: 'David',
      last_name: 'Brown',
      phone: '+15552222222',
      email: 'david@example.com',
      profile_image_id: null,
    },
    {
      user_id: ID.unique(),
      role: 'rider' as const,
      first_name: 'Alice',
      last_name: 'Smith',
      phone: '+15551234567',
      email: 'alice@example.com',
      profile_image_id: null,
    },
  ];

  for (const user of users) {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      ID.unique(),
      user
    );
  }
  console.log('Users seeded');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
