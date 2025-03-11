// routes/notificationRoutes.js

import express from 'express';
import {
  createNotification,
  getAllNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/', getAllNotifications);
router.put('/:id/read', markNotificationAsRead);

export default router;