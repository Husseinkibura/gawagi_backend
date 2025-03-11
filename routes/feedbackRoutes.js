import express from 'express';
import FeedbackController from '../controllers/FeedbackController.js';

const router = express.Router();

// Get patient details by ID
router.get('/patient/:patientId', FeedbackController.getPatientDetails);


// Submit feedback
router.post('/feedback', FeedbackController.submitFeedback);

// Get all feedback
router.get('/feedback', FeedbackController.getAllFeedback);

// Mark feedback as read
router.put('/feedback/:feedbackId/mark-as-read', FeedbackController.markFeedbackAsRead);


// Delete feedback
router.delete('/feedback/:feedbackId', FeedbackController.deleteFeedback);

export default router;