import { Request, Response } from 'express';
import { RideModel } from '../models/rideModel';
<<<<<<< HEAD
import { Query } from 'node-appwrite';
=======
>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9
import { Ride } from '../types/models';

export class RideController {
    static async create(req: Request, res: Response) {
        try {
            const rideData: Omit<Ride, '$id' | 'created_at'> = req.body;
            
            // Validate required fields
            if (!rideData.origin_address || !rideData.destination_address || 
                !rideData.origin_latitude || !rideData.origin_longitude ||
                !rideData.destination_latitude || !rideData.destination_longitude ||
                !rideData.ride_time || !rideData.fare_price || !rideData.payment_status) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: origin_address, destination_address, origin_latitude, origin_longitude, destination_latitude, destination_longitude, ride_time, fare_price, payment_status'
                });
            }

            // Validate coordinates
            if (rideData.origin_latitude < -90 || rideData.origin_latitude > 90 ||
                rideData.origin_longitude < -180 || rideData.origin_longitude > 180 ||
                rideData.destination_latitude < -90 || rideData.destination_latitude > 90 ||
                rideData.destination_longitude < -180 || rideData.destination_longitude > 180) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid coordinates'
                });
            }

            // Validate ride_time
            if (rideData.ride_time <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Ride time must be positive'
                });
            }

            // Validate fare_price
            if (rideData.fare_price < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Fare price cannot be negative'
                });
            }

            // Validate payment_status
            if (!['paid', 'pending', 'failed'].includes(rideData.payment_status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment status. Must be: paid, pending, or failed'
                });
            }

            const ride = await RideModel.create(rideData);
            
            res.status(201).json({
                success: true,
                data: ride
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create ride',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ride = await RideModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: ride
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Ride not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByDriver(req: Request, res: Response) {
        try {
            const { driverId } = req.params;
            const rides = await RideModel.getByDriver(driverId);
            
            res.status(200).json({
                success: true,
                data: rides
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get rides by driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByRider(req: Request, res: Response) {
        try {
            const { riderId } = req.params;
            const rides = await RideModel.getByRider(riderId);
            
            res.status(200).json({
                success: true,
                data: rides
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get rides by rider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getActiveRides(req: Request, res: Response) {
        try {
            const rides = await RideModel.getActiveRides();
            
            res.status(200).json({
                success: true,
                data: rides
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get active rides',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<Ride> = req.body;
            
            // Validate coordinates if provided
            if (updateData.origin_latitude !== undefined && (updateData.origin_latitude < -90 || updateData.origin_latitude > 90)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid origin latitude'
                });
            }
            if (updateData.origin_longitude !== undefined && (updateData.origin_longitude < -180 || updateData.origin_longitude > 180)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid origin longitude'
                });
            }
            if (updateData.destination_latitude !== undefined && (updateData.destination_latitude < -90 || updateData.destination_latitude > 90)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid destination latitude'
                });
            }
            if (updateData.destination_longitude !== undefined && (updateData.destination_longitude < -180 || updateData.destination_longitude > 180)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid destination longitude'
                });
            }

            // Validate ride_time if provided
            if (updateData.ride_time !== undefined && updateData.ride_time <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Ride time must be positive'
                });
            }

            // Validate fare_price if provided
            if (updateData.fare_price !== undefined && updateData.fare_price < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Fare price cannot be negative'
                });
            }

            // Validate payment_status if provided
            if (updateData.payment_status && !['paid', 'pending', 'failed'].includes(updateData.payment_status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment status. Must be: paid, pending, or failed'
                });
            }

            const ride = await RideModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: ride
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update ride',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await RideModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Ride deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete ride',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
<<<<<<< HEAD
            const { payment_status, limit, offset } = req.query as Record<string, string | undefined>;
            const queries: string[] = [];

            if (payment_status) {
                queries.push(Query.equal('payment_status', payment_status));
            }

            if (limit !== undefined) {
                queries.push(Query.limit(Number(limit)));
            }
            if (offset !== undefined && Number(offset) > 0) {
                queries.push(Query.offset(Number(offset)));
            }
=======
            const { payment_status, limit = '20', offset = '0' } = req.query;
            const queries: string[] = [];
            
            if (payment_status) {
                queries.push(`equal("payment_status", "${payment_status}")`);
            }
            
            queries.push(`limit(${limit})`);
            queries.push(`offset(${offset})`);
>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9

            const rides = await RideModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: rides
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list rides',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async updatePaymentStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            if (!status || !['paid', 'pending', 'failed'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment status. Must be: paid, pending, or failed'
                });
            }

            const ride = await RideModel.updatePaymentStatus(id, status);
            
            res.status(200).json({
                success: true,
                data: ride
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update payment status',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}