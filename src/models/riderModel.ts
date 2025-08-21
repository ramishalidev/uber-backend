import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { Rider } from '../types/models';

export class RiderModel {
    static async create(riderData: Omit<Rider, '$id'>): Promise<Rider> {
        try {
            const rider = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
                ID.unique(),
                {
                    home_address: riderData.home_address || null,
                    work_address: riderData.work_address || null,
                    total_rides: riderData.total_rides,
                    average_rating: riderData.average_rating,
                    users: riderData.users || null,
                    paymentMethod: riderData.paymentMethod || null
                }
            );
            return rider as unknown as Rider;
        } catch (error) {
            throw new Error(`Failed to create rider: ${error}`);
        }
    }

    static async getById(id: string): Promise<Rider> {
        try {
            const rider = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
                id
            );
            return rider as unknown as Rider;
        } catch (error) {
            throw new Error(`Failed to get rider: ${error}`);
        }
    }

    static async getByUser(userId: string): Promise<Rider | null> {
        try {
            const riders = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
                [Query.equal('user', userId)]
            );
            return riders.documents.length > 0 ? (riders.documents[0] as unknown as Rider) : null;
        } catch (error) {
            throw new Error(`Failed to get rider by user: ${error}`);
        }
    }

<<<<<<< HEAD
    static async update(id: string, riderData: Partial<Omit<Rider, '$id'>>): Promise<Rider> {
=======
    static async update(id: string, riderData: Partial<Rider>): Promise<Rider> {
>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9
        try {
            const rider = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
                id,
                riderData
            );
            return rider as unknown as Rider;
        } catch (error) {
            throw new Error(`Failed to update rider: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete rider: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<Rider[]> {
        try {
            const riders = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDERS,
<<<<<<< HEAD
                queries.length ? queries : undefined
=======
                queries
>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9
            );
            return riders.documents as unknown as Rider[];
        } catch (error) {
            throw new Error(`Failed to list riders: ${error}`);
        }
    }

    static async incrementRides(id: string): Promise<Rider> {
        try {
            const rider = await this.getById(id);
            return await this.update(id, {
                total_rides: rider.total_rides + 1
            });
        } catch (error) {
            throw new Error(`Failed to increment rides: ${error}`);
        }
    }

    static async updateRating(id: string, newRating: number): Promise<Rider> {
        try {
            const rider = await this.getById(id);
            const newAverageRating = ((rider.average_rating * rider.total_rides) + newRating) / (rider.total_rides + 1);
            return await this.update(id, {
                average_rating: newAverageRating
            });
        } catch (error) {
            throw new Error(`Failed to update rating: ${error}`);
        }
    }
}