import { Request, Response } from 'express';
import { CarModel } from '../models/carModel';
import { Car } from '../types/models';

export class CarController {
    static async create(req: Request, res: Response) {
        try {
            const carData: Omit<Car, '$id'> = req.body;
            
            // Validate required fields
            if (!carData.vehicle_plate || !carData.vehicle_model || !carData.vehicle_year || 
                !carData.car_seats || !carData.insurance_expires_at) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: vehicle_plate, vehicle_model, vehicle_year, car_seats, insurance_expires_at'
                });
            }

            // Validate vehicle year
            const currentYear = new Date().getFullYear();
            if (carData.vehicle_year < 1900 || carData.vehicle_year > currentYear + 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid vehicle year'
                });
            }

            // Validate car seats
            if (carData.car_seats < 1 || carData.car_seats > 20) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid number of car seats'
                });
            }

            const car = await CarModel.create(carData);
            
            res.status(201).json({
                success: true,
                data: car
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create car',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const car = await CarModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: car
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Car not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByDriver(req: Request, res: Response) {
        try {
            const { driverId } = req.params;
            const car = await CarModel.getByDriver(driverId);
            
            if (!car) {
                return res.status(404).json({
                    success: false,
                    message: 'Car not found for this driver'
                });
            }

            res.status(200).json({
                success: true,
                data: car
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get car by driver',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<Car> = req.body;
            
            // Validate vehicle year if provided
            if (updateData.vehicle_year) {
                const currentYear = new Date().getFullYear();
                if (updateData.vehicle_year < 1900 || updateData.vehicle_year > currentYear + 1) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid vehicle year'
                    });
                }
            }

            // Validate car seats if provided
            if (updateData.car_seats) {
                if (updateData.car_seats < 1 || updateData.car_seats > 20) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid number of car seats'
                    });
                }
            }

            const car = await CarModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: car
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update car',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CarModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Car deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete car',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { driver, limit = '20', offset = '0' } = req.query;
            const queries: string[] = [];
            
            if (driver) {
                queries.push(`equal("driver", "${driver}")`);
            }
            
            queries.push(`limit(${limit})`);
            queries.push(`offset(${offset})`);

            const cars = await CarModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: cars
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list cars',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
