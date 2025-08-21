import { Request, Response } from 'express';
import { DriverModel } from '../models/driverModel';
import { Query } from 'node-appwrite';
import { Driver } from '../types/models';

export class DriverController {
    static async create(req: Request, res: Response) {
        try {
            const driverData: Omit<Driver, '$id'> = req.body;
            
            // Validate required fields
            if (!driverData.rating|| !driverData.background_check_status || 
                !driverData.driver_license_number || !driverData.license_expires_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: rating, verified, background_check_status, driver_license_number, license_expires_at'
                });
            }

            // Validate rating
            if (driverData.rating < 0 || driverData.rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 0 and 5'
                });
            }

            // Validate background check status
            if (!['pending', 'passed', 'failed'].includes(driverData.background_check_status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid background check status. Must be: pending, passed, or failed'
                });
            }

            const driver = await DriverModel.create(driverData);
            
            res.status(201).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const driver = await DriverModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Driver not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const driver = await DriverModel.getByUser(userId);
            
            if (!driver) {
                return res.status(404).json({
                    success: false,
                    message: 'Driver not found for this user'
                });
            }

            res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get driver by user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }


    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<Driver> = req.body;
            
            // Validate rating if provided
            if (updateData.rating !== undefined) {
                if (updateData.rating < 0 || updateData.rating > 5) {
                    return res.status(400).json({
                        success: false,
                        message: 'Rating must be between 0 and 5'
                    });
                }
            }

            // Validate background check status if provided
            if (updateData.background_check_status && 
                !['pending', 'passed', 'failed'].includes(updateData.background_check_status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid background check status. Must be: pending, passed, or failed'
                });
            }

            const driver = await DriverModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await DriverModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Driver deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { background_check_status, limit, offset } = req.query as Record<string, string | undefined>;
            const queries: string[] = [];

            if (background_check_status) {
                queries.push(Query.equal('background_check_status', background_check_status));
            }

            if (limit !== undefined) {
                queries.push(Query.limit(Number(limit)));
            }
            if (offset !== undefined && Number(offset) > 0) {
                queries.push(Query.offset(Number(offset)));
            }

            const drivers = await DriverModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: drivers
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list drivers',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}