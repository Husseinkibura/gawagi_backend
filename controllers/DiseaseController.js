import {
    getAllDiseases,
    getDiseaseById,
    createDisease,
    updateDisease,
    deleteDisease,
  } from '../models/DiseaseModel.js';
  
  export const getAllDiseasesController = async (req, res) => {
    try {
      const diseases = await getAllDiseases();
      res.status(200).json(diseases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getDiseaseByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const disease = await getDiseaseById(id);
      if (!disease) {
        return res.status(404).json({ message: 'Disease not found' });
      }
      res.status(200).json(disease);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const createDiseaseController = async (req, res) => {
    try {
      const diseaseData = req.body;
      const newDisease = await createDisease(diseaseData);
      res.status(201).json(newDisease);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateDiseaseController = async (req, res) => {
    try {
      const { id } = req.params;
      const diseaseData = req.body;
      const updatedDisease = await updateDisease(id, diseaseData);
      if (!updatedDisease) {
        return res.status(404).json({ message: 'Disease not found' });
      }
      res.status(200).json(updatedDisease);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteDiseaseController = async (req, res) => {
    try {
      const { id } = req.params;
      const isDeleted = await deleteDisease(id);
      if (!isDeleted) {
        return res.status(404).json({ message: 'Disease not found' });
      }
      res.status(200).json({ message: 'Disease deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };