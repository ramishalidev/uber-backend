import {
  Client,
  Databases,
  Storage,
  Users,
  Query,
  Account,
} from "node-appwrite";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;

export const COLLECTIONS = {
  USERS: process.env.APPWRITE_USERS_COLLECTION_ID!,
  DRIVERS: process.env.APPWRITE_DRIVERS_COLLECTION_ID!,
  RIDERS: process.env.APPWRITE_RIDERS_COLLECTION_ID!,
  CARS: process.env.APPWRITE_CARS_COLLECTION_ID!,
  RIDES: process.env.APPWRITE_RIDES_COLLECTION_ID!,
  RIDE_HISTORY: process.env.APPWRITE_RIDE_HISTORY_COLLECTION_ID!,
  PAYMENT_METHODS: process.env.APPWRITE_PAYMENT_METHODS_COLLECTION_ID!,
};

export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);
export const account = new Account(client);
