// routes/testsRoutes.js

import express from 'express';
import DiseaseController from '../controllers/testsController.js';

const router = express.Router();

router.get('/', DiseaseController.getAllDiseases);
router.get('/:id', DiseaseController.getDiseaseById);
router.post('/', DiseaseController.createDisease);
router.put('/:id', DiseaseController.updateDisease);
router.delete('/:id', DiseaseController.deleteDisease);

export default router;