import { Router } from 'express';
import { RiderController } from '../controllers/riderController';

const router = Router();

// Create a new rider
router.post('/', RiderController.create);

// Get rider by ID
router.get('/:id', RiderController.getById);

// Get rider by user ID
router.get('/by-user/:userId', RiderController.getByUser);

// Update rider
router.put('/:id', RiderController.update);

// Delete rider
router.delete('/:id', RiderController.delete);

// List riders with optional filters
router.get('/', RiderController.list);

// Increment rides count
router.patch('/:id/increment-rides', RiderController.incrementRides);

// Update rating
router.patch('/:id/rating', RiderController.updateRating);

export default router;