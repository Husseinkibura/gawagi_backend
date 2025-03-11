import { createReport, getReports, getReportById, updateReport, deleteReport } from '../models/reportModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the 'uploads' directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
    }
  },
});

export const createReportController = async (req, res) => {
  try {
    const { reportName } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const reportFile = req.file.filename; // Store only the filename

    // Automatically generate the current date and time
    const now = new Date();
    const reportDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const reportTime = now.toTimeString().split(" ")[0]; // Format: HH:MM:SS

    // Pass the generated date and time to the model
    const id = await createReport(reportName, reportFile, reportDate, reportTime);

    res.status(201).json({ id, message: 'Report created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReportsController = async (req, res) => {
  try {
    const reports = await getReports();
    const reportsWithUrl = reports.map(report => ({
      ...report,
      file_url: `http://localhost:${process.env.PORT}/uploads/${report.report_file}`,
    }));
    res.status(200).json(reportsWithUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReportByIdController = async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({
      ...report,
      file_url: `http://localhost:${process.env.PORT}/uploads/${report.report_file}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReportController = async (req, res) => {
  try {
    const { reportName } = req.body;
    const reportFile = req.file ? req.file.filename : null;

    // Fetch the existing report to delete the old file if a new file is uploaded
    const existingReport = await getReportById(req.params.id);
    if (!existingReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (reportFile && existingReport.report_file) {
      const oldFilePath = path.join(uploadDir, existingReport.report_file);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Delete the old file
      }
    }

    await updateReport(req.params.id, reportName, reportFile || existingReport.report_file);

    res.status(200).json({ message: 'Report updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReportController = async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete the associated file
    const filePath = path.join(uploadDir, report.report_file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await deleteReport(req.params.id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};