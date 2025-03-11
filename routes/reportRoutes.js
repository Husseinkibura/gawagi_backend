// routes/reportRoutes.js
import express from 'express';
import {
  createReportController,
  getReportsController,
  getReportByIdController,
  updateReportController,
  deleteReportController,
  upload,
} from '../controllers/reportController.js';

const router = express.Router();

// Define routes
router.post('/', upload.single('reportFile'), createReportController); // POST /api/reports
router.get('/', getReportsController); // GET /api/reports
router.get('/:id', getReportByIdController); // GET /api/reports/:id
router.put('/:id', upload.single('reportFile'), updateReportController); // PUT /api/reports/:id
router.delete('/:id', deleteReportController); // DELETE /api/reports/:id

export default router;