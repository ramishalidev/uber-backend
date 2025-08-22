import { Router } from 'express';
import { DriverController } from '../controllers/driverController';

const router = Router();

// Create a new driver
router.post('/', DriverController.create);

// Get driver by ID
router.get('/:id', DriverController.getById);

// Get driver by user ID
router.get('/by-user/:userId', DriverController.getByUser);

// Update driver
router.put('/:id', DriverController.update);

// Delete driver
router.delete('/:id', DriverController.delete);

// List drivers with optional filters
router.get('/', DriverController.list);

export default router;