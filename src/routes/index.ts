import { Router } from 'express';
import userRoutes from './userRoutes';
import driverRoutes from './driverRoutes';
import riderRoutes from './riderRoutes';
import carRoutes from './carRoutes';
import paymentMethodRoutes from './paymentMethodRoutes';
import rideRoutes from './rideRoutes';
import rideHistoryRoutes from './rideHistoryRoutes';
import homeRoutes from './homeRoutes';

const router = Router();

// Health check route
router.use('/', homeRoutes);

// API routes (mounted under /api in src/index.ts)
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);
router.use('/riders', riderRoutes);
router.use('/cars', carRoutes);
router.use('/payment-methods', paymentMethodRoutes);
router.use('/rides', rideRoutes);
router.use('/ride-history', rideHistoryRoutes);

export default router;
