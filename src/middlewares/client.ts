import { Client } from "node-appwrite";
import dotenv from "dotenv";

const client = new Client();

dotenv.config();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || " ")
  .setProject(process.env.APPWRITE_PROJECT_ID || " ")
  .setKey(process.env.APPWRITE_API_KEY || " ");

export default client;
