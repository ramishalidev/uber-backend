import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { User } from '../types/models';

export class UserModel {
    static async create(userData: Omit<User, '$id'>): Promise<User> {
        try {
            const user = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.USERS,
                ID.unique(),
                {
                    user_id: userData.user_id,
                    role: userData.role,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    phone: userData.phone || null,
                    email: userData.email || null,
                    profile_image_id: userData.profile_image_id || null
                }
            );
            return user as unknown as User;
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`);
        }
    }

    static async getById(id: string): Promise<User> {
        try {
            const user = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.USERS,
                id
            );
            return user as unknown as User;
        } catch (error) {
            throw new Error(`Failed to get user: ${error}`);
        }
    }

    static async getByUserId(userId: string): Promise<User | null> {
        try {
            const users = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.USERS,
                [Query.equal('user_id', userId)]
            );
            return users.documents.length > 0 ? (users.documents[0] as unknown as User) : null;
        } catch (error) {
            throw new Error(`Failed to get user by user_id: ${error}`);
        }
    }

    static async update(id: string, userData: Partial<Omit<User, '$id'>>): Promise<User> {
        try {
            const user = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.USERS,
                id,
                userData
            );
            return user as unknown as User;
        } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.USERS,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<User[]> {
        try {
            const users = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.USERS,
                queries
            );
            return users.documents as unknown as User[];
        } catch (error) {
            throw new Error(`Failed to list users: ${error}`);
        }
    }
}
