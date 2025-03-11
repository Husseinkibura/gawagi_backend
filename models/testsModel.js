import pool from '../config/db.js';

class DiseaseModel {
    static async getAllDiseases() {
        const [rows] = await pool.query('SELECT * FROM diseases');
        return rows;
    }

    static async getDiseaseById(id) {
        const [rows] = await pool.query('SELECT * FROM diseases WHERE id = ?', [id]);
        return rows[0];
    }

    static async createDisease(disease) {
        const { disease_name, test_type, price, drug_name, drug_price, quantity } = disease;
        const [result] = await pool.query(
            'INSERT INTO diseases (disease_name, test_type, price, drug_name, drug_price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
            [disease_name, test_type, price, drug_name, drug_price, quantity]
        );
        return result.insertId;
    }

    static async updateDisease(id, disease) {
        const { disease_name, test_type, price, drug_name, drug_price, quantity } = disease;
        const [result] = await pool.query(
            'UPDATE diseases SET disease_name = ?, test_type = ?, price = ?, drug_name = ?, drug_price = ?, quantity = ? WHERE id = ?',
            [disease_name, test_type, price, drug_name, drug_price, quantity, id]
        );
        return result.affectedRows;
    }

    static async deleteDisease(id) {
        const [result] = await pool.query('DELETE FROM diseases WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

export default DiseaseModel;