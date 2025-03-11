import pool from '../config/db.js';

class FeedbackModel {
  static async getPatientDetails(patientId) {
        const [rows] = await pool.query('SELECT fullname, mobile FROM patients WHERE PatientId = ?', [patientId]);
        return rows[0];
      }

      static async submitFeedback(patientId, satisfaction, improvements, comment) {
        const [result] = await pool.query(
          'INSERT INTO feedback (patient_id, satisfaction, improvements, comment, status) VALUES (?, ?, ?, ?, ?)',
          [patientId, satisfaction, JSON.stringify(improvements), comment, 'unread']
        );
        return result.insertId;
      }
    
      static async getAllFeedback() {
        const [rows] = await pool.query(`
          SELECT f.*, p.fullname, p.mobile
          FROM feedback f
          JOIN patients p ON f.patient_id = p.PatientId
          ORDER BY f.created_at DESC
        `);
        return rows;
      }
    
      static async markFeedbackAsRead(feedbackId) {
        await pool.query('UPDATE feedback SET status = ? WHERE id = ?', ['read', feedbackId]);
      }
    
      static async deleteFeedback(feedbackId) {
        await pool.query('DELETE FROM feedback WHERE id = ?', [feedbackId]);
      }
    
}

export default FeedbackModel;