import express from 'express';
import {
  getAllDiseasesController,
  getDiseaseByIdController,
  createDiseaseController,
  updateDiseaseController,
  deleteDiseaseController,
} from '../controllers/DiseaseController.js';

const router = express.Router();

// CRUD Routes
router.get('/diseases', getAllDiseasesController);
router.get('/diseases/:id', getDiseaseByIdController);
router.post('/diseases', createDiseaseController);
router.put('/diseases/:id', updateDiseaseController);
router.delete('/diseases/:id', deleteDiseaseController);

export default router;