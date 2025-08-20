import { User } from "@/types/appwrite";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Account, Users, ID } from "node-appwrite";
import client from "../middlewares/client";

const account = new Account(client);
const users = new Users(client);

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
    const hashPassword = await bcrypt.hash(password, 10);
    const response = await account.create(
      ID.unique(),
      email!,
      password,
      `${first_name} ${last_name}`
    );
    return res.status(201).json(response);
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: String(err) });
    }
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await users.get(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: String(err) });
    }
  }
};
