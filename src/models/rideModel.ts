import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { Ride } from '../types/models';

export class RideModel {
    static async create(rideData: Omit<Ride, '$id' | 'created_at'>): Promise<Ride> {
        try {
            const ride = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                ID.unique(),
                {
                    origin_address: rideData.origin_address,
                    destination_address: rideData.destination_address,
                    origin_latitude: rideData.origin_latitude,
                    origin_longitude: rideData.origin_longitude,
                    destination_latitude: rideData.destination_latitude,
                    destination_longitude: rideData.destination_longitude,
                    ride_time: rideData.ride_time,
                    fare_price: rideData.fare_price,
                    payment_status: rideData.payment_status,
                    drivers: rideData.drivers || null,
                    riders: rideData.riders || null
                }
            );
            return ride as unknown as Ride;
        } catch (error) {
            throw new Error(`Failed to create ride: ${error}`);
        }
    }

    static async getById(id: string): Promise<Ride> {
        try {
            const ride = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                id
            );
            return ride as unknown as Ride;
        } catch (error) {
            throw new Error(`Failed to get ride: ${error}`);
        }
    }

    static async getByDriver(driverId: string): Promise<Ride[]> {
        try {
            const rides = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                [Query.equal('drivers', driverId)]
            );
            return rides.documents as unknown as Ride[];
        } catch (error) {
            throw new Error(`Failed to get rides by driver: ${error}`);
        }
    }

    static async getByRider(riderId: string): Promise<Ride[]> {
        try {
            const rides = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                [Query.equal('riders', riderId)]
            );
            return rides.documents as unknown as Ride[];
        } catch (error) {
            throw new Error(`Failed to get rides by rider: ${error}`);
        }
    }

    static async getActiveRides(): Promise<Ride[]> {
        try {
            const rides = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                [Query.equal('payment_status', 'pending')]
            );
            return rides.documents  as unknown as Ride[];
        } catch (error) {
            throw new Error(`Failed to get active rides: ${error}`);
        }
    }

    static async update(id: string, rideData: Partial<Ride>): Promise<Ride> {
        try {
            const ride = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                id,
                rideData
            );
            return ride as unknown as Ride;
        } catch (error) {
            throw new Error(`Failed to update ride: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete ride: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<Ride[]> {
        try {
            const rides = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.RIDES,
                queries
            );
            return rides.documents as unknown as Ride[];
        } catch (error) {
            throw new Error(`Failed to list rides: ${error}`);
        }
    }

    static async updatePaymentStatus(id: string, status: 'paid' | 'pending' | 'failed'): Promise<Ride> {
        try {
            return await this.update(id, { payment_status: status });
        } catch (error) {
            throw new Error(`Failed to update payment status: ${error}`);
        }
    }
}