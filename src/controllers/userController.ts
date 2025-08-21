import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { Query } from 'node-appwrite';
import { User } from '../types/models';

export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const userData: Omit<User, '$id'> = req.body;
            
            // Validate required fields
            if (!userData.user_id || !userData.role || !userData.first_name || !userData.last_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: user_id, role, first_name, last_name'
                });
            }

            // Check if user already exists
            const existingUser = await UserModel.getByUserId(userData.user_id);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            const user = await UserModel.create(userData);
            
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserModel.getById(id);
            
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await UserModel.getByUserId(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData: Partial<User> = req.body;
            
            const user = await UserModel.update(id, updateData);
            
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await UserModel.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { role, limit, offset } = req.query as Record<string, string | undefined>;
            const queries: string[] = [];

            if (role) {
                queries.push(Query.equal('role', role));
            }

            if (limit !== undefined) {
                queries.push(Query.limit(Number(limit)));
            }
            if (offset !== undefined && Number(offset) > 0) {
                queries.push(Query.offset(Number(offset)));
            }

            const users = await UserModel.list(queries);
            
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to list users',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
