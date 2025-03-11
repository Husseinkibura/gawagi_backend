import express from 'express';
import billingController from '../controllers/billingController.js';

const router = express.Router();

router.post('/billings', billingController.createBilling);
router.get('/billings', billingController.getAllBillings);
router.get('/billings/:id', billingController.getBillingById);

export default router;