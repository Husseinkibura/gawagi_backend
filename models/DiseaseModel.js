import pool from '../config/db.js';

export const getAllDiseases = async () => {
  const [rows] = await pool.query('SELECT * FROM diseases');
  return rows;
};

export const getDiseaseById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM diseases WHERE id = ?', [id]);
  return rows[0];
};

export const createDisease = async (diseaseData) => {
  const {
    disease_name,
    description,
    symptoms,
    causes,
    risk_factors,
    prevention,
    treatment,
    test_type,
    price,
  } = diseaseData;

  const [result] = await pool.query(
    `
    INSERT INTO diseases (
      disease_name, description, symptoms, causes, risk_factors, prevention, treatment, test_type, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      disease_name,
      description,
      symptoms,
      causes,
      risk_factors,
      prevention,
      treatment,
      test_type,
      price,
    ]
  );

  return { id: result.insertId, ...diseaseData };
};

export const updateDisease = async (id, diseaseData) => {
  const {
    disease_name,
    description,
    symptoms,
    causes,
    risk_factors,
    prevention,
    treatment,
    test_type,
    price,
  } = diseaseData;

  const [result] = await pool.query(
    `
    UPDATE diseases
    SET
      disease_name = ?,
      description = ?,
      symptoms = ?,
      causes = ?,
      risk_factors = ?,
      prevention = ?,
      treatment = ?,
      test_type = ?,
      price = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,
    [
      disease_name,
      description,
      symptoms,
      causes,
      risk_factors,
      prevention,
      treatment,
      test_type,
      price,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, ...diseaseData };
};

export const deleteDisease = async (id) => {
  const [result] = await pool.query('DELETE FROM diseases WHERE id = ?', [id]);
  return result.affectedRows > 0;
};