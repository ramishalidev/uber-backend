import { Router } from 'express';
import { CarController } from '../controllers/carController';

const router = Router();

// Create a new car
router.post('/', CarController.create);

// Get car by ID
router.get('/:id', CarController.getById);

// Get car by driver ID
router.get('/by-driver/:driverId', CarController.getByDriver);

// Update car
router.put('/:id', CarController.update);

// Delete car
router.delete('/:id', CarController.delete);

// List cars with optional filters
router.get('/', CarController.list);

export default router;
