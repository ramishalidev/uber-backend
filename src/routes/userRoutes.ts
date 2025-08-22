import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/', UserController.create);

// Get user by ID
router.get('/:id', UserController.getById);

// Get user by user_id (Appwrite Auth UID)
router.get('/by-user-id/:userId', UserController.getByUserId);

// Update user
router.put('/:id', UserController.update);

// Delete user
router.delete('/:id', UserController.delete);

// List users with optional filters
router.get('/', UserController.list);

export default router;
