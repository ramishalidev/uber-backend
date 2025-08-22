import { User } from "@/types/appwrite";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ID, Query } from "node-appwrite";
import { users, databases, account } from "../config/appwrite";

export const signUpController = async (req: Request, res: Response) => {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    role,
    profile_image_id,
  }: User & { password: string } = req.body;
  try {
    // const hashPassword = await bcrypt.hash(password, 10);
    const user = await users.create(
      ID.unique(),
      email ?? "",
      phone_number && /^\+\d{1,15}$/.test(phone_number)
        ? phone_number
        : undefined,
      password,
      `${first_name} ${last_name}`
    );
    const profileData: Record<string, any> = {
      user_id: user.$id,
      role: role,
      first_name,
      last_name,
    };
    if (email) profileData.email = email;
    if (profile_image_id) profileData.profile_image_id = profile_image_id;

    const profile = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID || "YOUR_DATABASE_ID",
      process.env.APPWRITE_USERS_COLLECTION_ID || "YOUR_COLLECTION_ID",
      ID.unique(),
      profileData
    );
    return res.status(201).json({ user, profile });
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: String(err) });
    }
  }
};
export const listAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await users.list();
    return res.status(200).json(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: String(err) });
    }
  }
};
export const loginController = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await users.get(session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.password) {
      return res.status(500).json({ error: "User password not set" });
    }
    const profileDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID || "YOUR_DATABASE_ID",
      process.env.APPWRITE_USERS_COLLECTION_ID || "YOUR_COLLECTION_ID",
      [Query.equal("user_id", user.$id)]
    );
    const profile = profileDocs.documents[0];

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    return res.status(200).json({ user, profile, session });
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: String(err) });
    }
  }
};
