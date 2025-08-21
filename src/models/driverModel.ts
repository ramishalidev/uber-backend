import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { Driver } from '../types/models';

export class DriverModel {
    static async create(driverData: Omit<Driver, '$id'>): Promise<Driver> {
        try {
            const driver = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                ID.unique(),
                {
                    rating: driverData.rating,
                    background_check_status: driverData.background_check_status,
                    background_check_expires_at: driverData.background_check_expires_at || null,
                    driver_license_number: driverData.driver_license_number,
                    license_expires_at: driverData.license_expires_at,
                    driver_license_image_id: driverData.driver_license_image_id || null,
                    car: driverData.car || null,
                    user: driverData.user || null,
                    paymentMethod: driverData.paymentMethod || null
                }
            );
            return driver as unknown as Driver;
        } catch (error) {
            throw new Error(`Failed to create driver: ${error}`);
        }
    }

    static async getById(id: string): Promise<Driver> {
        try {
            const driver = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                id
            );
            return driver as unknown as Driver;
        } catch (error) {
            throw new Error(`Failed to get driver: ${error}`);
        }
    }

    static async getByUser(userId: string): Promise<Driver | null> {
        try {
            const drivers = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                [Query.equal('user', userId)]
            );
            return drivers.documents.length > 0 ? (drivers.documents[0] as unknown as Driver) : null;
        } catch (error) {
            throw new Error(`Failed to get driver by user: ${error}`);
        }
    }

    static async update(id: string, driverData: Partial<Driver>): Promise<Driver> {
        try {
            const driver = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                id,
                driverData
            );
            return driver as unknown as Driver;
        } catch (error) {
            throw new Error(`Failed to update driver: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete driver: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<Driver[]> {
        try {
            const drivers = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.DRIVERS,
                queries
            );
            return drivers.documents as unknown as Driver[];
        } catch (error) {
            throw new Error(`Failed to list drivers: ${error}`);
        }
    }
}