import pool from '../config/db.js';

export const createReport = async (reportName, reportFile, reportDate, reportTime) => {
  const [result] = await pool.query(
    'INSERT INTO reports (report_name, report_file, report_date, report_time) VALUES (?, ?, ?, ?)',
    [reportName, reportFile, reportDate, reportTime]
  );
  return result.insertId;
};

export const getReports = async () => {
  const [rows] = await pool.query('SELECT * FROM reports');
  return rows;
};

export const getReportById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
  return rows[0];
};

export const updateReport = async (id, reportName, reportFile) => {
  await pool.query(
    'UPDATE reports SET report_name = ?, report_file = ? WHERE id = ?',
    [reportName, reportFile, id]
  );
};

export const deleteReport = async (id) => {
  await pool.query('DELETE FROM reports WHERE id = ?', [id]);
};