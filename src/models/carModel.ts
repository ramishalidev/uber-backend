import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { Car } from '../types/models';

export class CarModel {
    static async create(carData: Omit<Car, '$id'>): Promise<Car> {
        try {
            const car = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.CARS,
                ID.unique(),
                {
                    vehicle_plate: carData.vehicle_plate,
                    vehicle_model: carData.vehicle_model,
                    vehicle_year: carData.vehicle_year,
                    car_seats: carData.car_seats,
                    insurance_expires_at: carData.insurance_expires_at,
                    car_image_id: carData.car_image_id || null,
                    driver: carData.driver || null
                }
            );
            return car as unknown as Car;
        } catch (error) {
            throw new Error(`Failed to create car: ${error}`);
        }
    }

    static async getById(id: string): Promise<Car> {
        try {
            const car = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.CARS,
                id
            );
            return car as unknown as Car;
        } catch (error) {
            throw new Error(`Failed to get car: ${error}`);
        }
    }

    static async getByDriver(driverId: string): Promise<Car | null> {
        try {
            const cars = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CARS,
                [Query.equal('driver', driverId)]
            );
            return cars.documents.length > 0 ? (cars.documents[0] as unknown as Car) : null;
        } catch (error) {
            throw new Error(`Failed to get car by driver: ${error}`);
        }
    }

    static async update(id: string, carData: Partial<Omit<Car, '$id'>>): Promise<Car> {
        try {
            const car = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.CARS,
                id,
                carData
            );
            return car as unknown as Car;
        } catch (error) {
            throw new Error(`Failed to update car: ${error}`);
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.CARS,
                id
            );
        } catch (error) {
            throw new Error(`Failed to delete car: ${error}`);
        }
    }

    static async list(queries: string[] = []): Promise<Car[]> {
        try {
            const cars = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CARS,
                queries.length ? queries : undefined
            );
            return cars.documents as unknown as Car[];
        } catch (error) {
            throw new Error(`Failed to list cars: ${error}`);
        }
    }
}
