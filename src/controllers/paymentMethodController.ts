import { Request, Response } from 'express';
import { PaymentMethodModel } from '../models/paymentMethodModel';
import { PaymentMethod } from '../types/models';

export class PaymentMethodController {
    static async create(req: Request, res: Response) {
        try {
            const paymentData: Omit<PaymentMethod, '$id'> = req.body;
            
            // Validate required fields
            if (!paymentData.method) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required field: method'
                });
            }

            // Validate method type
            if (!['cash', 'card', 'wallet'].includes(paymentData.method)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment method. Must be: cash, card, or wallet'
                });
            }

            const paymentMethod = await PaymentMethodModel.create(paymentData);
            
            res.status(201).json({
                success: true,
                data: paymentMethod
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create payment method',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const paymentMethod = await PaymentMethodModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: paymentMethod
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'Payment method not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<PaymentMethod> = req.body;
            
            // Validate method type if provided
            if (updateData.method && !['cash', 'card', 'wallet'].includes(updateData.method)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment method. Must be: cash, card, or wallet'
                });
            }

            const paymentMethod = await PaymentMethodModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: paymentMethod
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update payment method',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await PaymentMethodModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Payment method deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete payment method',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { method, limit = '20', offset = '0' } = req.query;
            const queries: string[] = [];
            
            if (method) {
                queries.push(`equal("method", "${method}")`);
            }
            
            queries.push(`limit(${limit})`);
            queries.push(`offset(${offset})`);

            const paymentMethods = await PaymentMethodModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: paymentMethods
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list payment methods',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}