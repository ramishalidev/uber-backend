import sdk from "node-appwrite";
import dotenv from "dotenv";

export const client = new sdk.Client();

dotenv.config();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || " ")
  .setProject(process.env.APPWRITE_PROJECT_ID || " ")
  .setKey(process.env.APPWRITE_API_KEY || " ");

export const account = new sdk.Account(client);
export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
