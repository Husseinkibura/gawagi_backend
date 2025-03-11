import FeedbackModel from '../models/FeedbackModel.js';
import { createNotification } from './notificationController.js';

class FeedbackController {
  static async getPatientDetails(req, res) {
    const { patientId } = req.params;
    try {
      const patient = await FeedbackModel.getPatientDetails(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  static async submitFeedback(req, res) {
    const { patientId, satisfaction, improvements, comment } = req.body;
    try {
      const feedbackId = await FeedbackModel.submitFeedback(patientId, satisfaction, improvements, comment);
      res.status(201).json({ message: 'Feedback submitted successfully', feedbackId });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getAllFeedback(req, res) {
    try {
      const feedback = await FeedbackModel.getAllFeedback();
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async markFeedbackAsRead(req, res) {
    const { feedbackId } = req.params;
    try {
      await FeedbackModel.markFeedbackAsRead(feedbackId);
      res.status(200).json({ message: 'Feedback marked as read' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async deleteFeedback(req, res) {
    const { feedbackId } = req.params;
    try {
      await FeedbackModel.deleteFeedback(feedbackId);
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
}

export default FeedbackController;