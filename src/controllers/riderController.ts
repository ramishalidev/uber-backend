import { Request, Response } from 'express';
import { RiderModel } from '../models/riderModel';
import { Query } from 'node-appwrite';
import { Rider } from '../types/models';

export class RiderController {
    static async create(req: Request, res: Response) {
        try {
            const riderData: Omit<Rider, '$id'> = req.body;
            
            // Validate required fields
            if (riderData.total_rides === undefined || riderData.average_rating === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: total_rides, average_rating'
                });
            }

            // Validate total_rides
            if (riderData.total_rides < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Total rides cannot be negative'
                });
            }

            // Validate average_rating
            if (riderData.average_rating < 0 || riderData.average_rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Average rating must be between 0 and 5'
                });
            }

            const rider = await RiderModel.create(riderData);
            
            res.status(201).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create rider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const rider = await RiderModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Rider not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const rider = await RiderModel.getByUser(userId);
            
            if (!rider) {
                return res.status(404).json({
                    success: false,
                    message: 'Rider not found for this user'
                });
            }

            res.status(200).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get rider by user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<Rider> = req.body;
            
            // Validate total_rides if provided
            if (updateData.total_rides !== undefined) {
                if (updateData.total_rides < 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Total rides cannot be negative'
                    });
                }
            }

            // Validate average_rating if provided
            if (updateData.average_rating !== undefined) {
                if (updateData.average_rating < 0 || updateData.average_rating > 5) {
                    return res.status(400).json({
                        success: false,
                        message: 'Average rating must be between 0 and 5'
                    });
                }
            }

            const rider = await RiderModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update rider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await RiderModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Rider deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete rider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { limit, offset } = req.query as Record<string, string | undefined>;
            const queries: string[] = [];

            if (limit !== undefined) {
                queries.push(Query.limit(Number(limit)));
            }
            if (offset !== undefined && Number(offset) > 0) {
                queries.push(Query.offset(Number(offset)));
            }

            const riders = await RiderModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: riders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list riders',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async incrementRides(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const rider = await RiderModel.incrementRides(id);
            
            res.status(200).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to increment rides',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async updateRating(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { rating } = req.body;
            
            if (!rating || rating < 0 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 0 and 5'
                });
            }

            const rider = await RiderModel.updateRating(id, rating);
            
            res.status(200).json({
                success: true,
                data: rider
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update rating',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}