// models/doctorsModel.js
import pool from '../config/db.js';

export const createDoctor = async (doctorData) => {
    const { fullname, username, password, email, age, lastLogin, profileImage, address, DateOfBirth, role } = doctorData;
    const [result] = await pool.query(
        `INSERT INTO doctors (fullname, username, password, email, age, lastLogin, profileImage, address, DateOfBirth, role) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullname, username, password, email, age, lastLogin, profileImage, address, DateOfBirth, role]
    );
    return result.insertId;
};

export const getAllDoctors = async () => {
    const [rows] = await pool.query('SELECT * FROM doctors');
    return rows;
};

export const getDoctorById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    return rows[0];
};

export const updateDoctor = async (id, doctorData) => {
    const { fullname, username, password, email, age, lastLogin, profileImage, address, DateOfBirth, role } = doctorData;
    const [result] = await pool.query(
        `UPDATE doctors 
         SET fullname = ?, username = ?, password = ?, email = ?, age = ?, lastLogin = ?, profileImage = ?, address = ?, DateOfBirth = ?, role = ? 
         WHERE id = ?`,
        [fullname, username, password, email, age, lastLogin, profileImage, address, DateOfBirth, role, id]
    );
    return result.affectedRows;
};

export const deleteDoctor = async (id) => {
    const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
    return result.affectedRows;
};