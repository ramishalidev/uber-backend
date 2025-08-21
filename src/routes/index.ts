import { Router } from 'express';
import userRoutes from './userRoutes';
import driverRoutes from './driverRoutes';
import riderRoutes from './riderRoutes';
import carRoutes from './carRoutes';
import paymentMethodRoutes from './paymentMethodRoutes';
import rideRoutes from './rideRoutes';
import rideHistoryRoutes from './rideHistoryRoutes';
import homeRoutes from './homeRoutes';
<<<<<<< HEAD
import authRoutes from "./authRoutes";
=======
>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9

const router = Router();

// Health check route
router.use('/', homeRoutes);
<<<<<<< HEAD
router.use("/auth", authRoutes);
=======

>>>>>>> 5570e1d399a06721e6efbaeeab0cfc0f7da4eea9
// API routes (mounted under /api in src/index.ts)
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);
router.use('/riders', riderRoutes);
router.use('/cars', carRoutes);
router.use('/payment-methods', paymentMethodRoutes);
router.use('/rides', rideRoutes);
router.use('/ride-history', rideHistoryRoutes);

export default router;
