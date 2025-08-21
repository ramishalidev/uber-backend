import { Client, Databases, Account, Storage } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

// Appwrite Client Configuration
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

// Database ID
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'uber_db';

// Collection IDs
export const COLLECTIONS = {
    USERS: process.env.APPWRITE_USERS_COLLECTION_ID || 'users',
    DRIVERS: process.env.APPWRITE_DRIVERS_COLLECTION_ID || 'drivers',
    RIDERS: process.env.APPWRITE_RIDERS_COLLECTION_ID || 'riders',
    CARS: process.env.APPWRITE_CARS_COLLECTION_ID || 'cars',
    PAYMENT_METHODS: process.env.APPWRITE_PAYMENT_METHOD_COLLECTION_ID || 'payment_methods',
    RIDES: process.env.APPWRITE_RIDES_COLLECTION_ID || 'rides',
    RIDE_HISTORY: process.env.APPWRITE_RIDE_HISTORY_COLLECTION_ID || 'ride_history'
} as const;

// Storage bucket IDs
export const BUCKETS = {
    PROFILE_IMAGES: process.env.APPWRITE_BUCKET_ID || 'profile_images',
    CAR_IMAGES: process.env.APPWRITE_BUCKET_ID ||'car_images',
    LICENSE_IMAGES: process.env.APPWRITE_BUCKET_ID ||'license_images'
} as const;

export default client;