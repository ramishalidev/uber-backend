import { databases, DATABASE_ID, COLLECTIONS } from '../config/appwrite';
import { Query, ID } from 'node-appwrite';
import { RideHistory } from '../types/models';

export class RideHistoryModel {
  static async create(data: Omit<RideHistory, '$id' | 'created_at'> & { created_at?: string }): Promise<RideHistory> {
    const payload = {
      rides: data.rides ?? null,
      riders: data.riders ?? null,
      drivers: data.drivers ?? null,
    };
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      ID.unique(),
      payload
    );
    return doc as unknown as RideHistory;
  }

  static async getById(id: string): Promise<RideHistory> {
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      id
    );
    return doc as unknown as RideHistory;
  }

  static async list(queries: string[] = []): Promise<RideHistory[]> {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      queries
    );
    return res.documents as unknown as RideHistory[];
  }

  static async listByRide(rideId: string): Promise<RideHistory[]> {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      [Query.equal('rides', rideId)]
    );
    return res.documents as unknown as RideHistory[];
  }

  static async listByRider(riderId: string): Promise<RideHistory[]> {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      [Query.equal('riders', riderId)]
    );
    return res.documents as unknown as RideHistory[];
  }

  static async listByDriver(driverId: string): Promise<RideHistory[]> {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      [Query.equal('drivers', driverId)]
    );
    return res.documents as unknown as RideHistory[];
  }

  static async delete(id: string): Promise<void> {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTIONS.RIDE_HISTORY,
      id
    );
  }
}


