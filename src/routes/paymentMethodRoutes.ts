import { Router } from 'express';
import { PaymentMethodController } from '../controllers/paymentMethodController';

const router = Router();

// Create a new payment method
router.post('/', PaymentMethodController.create);

// Get payment method by ID
router.get('/:id', PaymentMethodController.getById);

// Update payment method
router.put('/:id', PaymentMethodController.update);

// Delete payment method
router.delete('/:id', PaymentMethodController.delete);

// List payment methods with optional filters
router.get('/', PaymentMethodController.list);

export default router;
