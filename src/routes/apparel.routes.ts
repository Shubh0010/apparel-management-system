import { Router } from 'express';
import * as apparelController from '../controllers/apparel.controller';

const router = Router();

router.put('/stock', apparelController.updateStock);
router.put('/stock/bulk', apparelController.bulkUpdateStock);
router.post('/order/check', apparelController.checkOrderFulfillment);
router.post('/order/cost', apparelController.getOrderCost);

export default router;