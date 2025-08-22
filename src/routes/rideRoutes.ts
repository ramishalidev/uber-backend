import { Router } from 'express';
import { RideController } from '../controllers/rideController';

const router = Router();

// Create a new ride
router.post('/', RideController.create);

// Get ride by ID
router.get('/:id', RideController.getById);

// Get rides by driver ID
router.get('/by-driver/:driverId', RideController.getByDriver);

// Get rides by rider ID
router.get('/by-rider/:riderId', RideController.getByRider);

// Get active rides
router.get('/active/list', RideController.getActiveRides);

// Update ride
router.put('/:id', RideController.update);

// Delete ride
router.delete('/:id', RideController.delete);

// List rides with optional filters
router.get('/', RideController.list);

// Update payment status
router.patch('/:id/payment-status', RideController.updatePaymentStatus);

export default router;