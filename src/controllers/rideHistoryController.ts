import { Request, Response } from 'express';
import { RideHistoryModel } from '../models/rideHistoryModel';
import { RideHistory } from '../types/models';

export class RideHistoryController {
  static async create(req: Request, res: Response) {
    try {
      const data: Omit<RideHistory, '$id' | 'created_at'> = req.body;
      const doc = await RideHistoryModel.create(data);
      res.status(201).json({ success: true, data: doc });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create ride history', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const doc = await RideHistoryModel.getById(id);
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Ride history not found', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const { rideId, riderId, driverId, limit = '20', offset = '0' } = req.query as Record<string, string>;
      const queries: string[] = [];
      if (rideId) queries.push(`equal("rides", "${rideId}")`);
      if (riderId) queries.push(`equal("riders", "${riderId}")`);
      if (driverId) queries.push(`equal("drivers", "${driverId}")`);
      queries.push(`limit(${limit})`);
      queries.push(`offset(${offset})`);

      const items = await RideHistoryModel.list(queries);
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to list ride history', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RideHistoryModel.delete(id);
      res.status(200).json({ success: true, message: 'Ride history deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete ride history', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}


