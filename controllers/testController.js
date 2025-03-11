// controllers/testController.js

import pool from '../config/db.js';

export const getTestByPatientId = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT t.expected_disease AS disease, 
                    tt.name AS testName, 
                    tt.price AS testPrice, 
                    t.other_symptoms AS otherSymptoms  -- Include other_symptoms in the SELECT statement
             FROM tests t 
             JOIN testtype tt ON t.check_for = tt.disease 
             WHERE t.patient_id = ?`,
            [req.params.patientId]
        );

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Test not found for this patient' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test details', error: error.message });
    }
};