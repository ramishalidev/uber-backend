import { Router } from 'express';
import { RideHistoryController } from '../controllers/rideHistoryController';

const router = Router();

router.post('/', RideHistoryController.create);
router.get('/:id', RideHistoryController.getById);
router.get('/', RideHistoryController.list);
router.delete('/:id', RideHistoryController.delete);

export default router;


