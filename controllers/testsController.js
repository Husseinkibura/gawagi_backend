import DiseaseModel from '../models/testsModel.js';

class DiseaseController {
    static async getAllDiseases(req, res) {
        try {
            const diseases = await DiseaseModel.getAllDiseases();
            res.json(diseases);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getDiseaseById(req, res) {
        try {
            const disease = await DiseaseModel.getDiseaseById(req.params.id);
            if (!disease) {
                return res.status(404).json({ message: 'Disease not found' });
            }
            res.json(disease);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createDisease(req, res) {
        try {
            const newDisease = await DiseaseModel.createDisease(req.body);
            res.status(201).json({ id: newDisease, ...req.body });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateDisease(req, res) {
        try {
            const updated = await DiseaseModel.updateDisease(req.params.id, req.body);
            if (updated) {
                res.json({ message: 'Disease updated successfully' });
            } else {
                res.status(404).json({ message: 'Disease not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteDisease(req, res) {
        try {
            const deleted = await DiseaseModel.deleteDisease(req.params.id);
            if (deleted) {
                res.json({ message: 'Disease deleted successfully' });
            } else {
                res.status(404).json({ message: 'Disease not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default DiseaseController;