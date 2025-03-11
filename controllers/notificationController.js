// controllers/notificationController.js

import Notification from '../models/notificationModel.js';

export const createNotification = async (req, res) => {
  try {
    const { message, status = "Unread" } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    const id = await Notification.create(null, message, status); // equipment_id can be null for feedback notifications
    res.status(201).json({ id, message, status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getAll();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.markAsRead(id);
    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};