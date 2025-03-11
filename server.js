import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import User from './models/userModel.js';
import drugRoutes from './routes/drugRoutes.js';
import testTypeRoutes from './routes/testTypeRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import cashierRoutes from './routes/cashierRoutes.js';
import pharmacistRoutes from './routes/pharmacistRoutes.js';
import billRoutes from './routes/billRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import testRoutes from './routes/testRoutes.js';
import paymentsRouter from './routes/billRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorsRoutes from './routes/doctorRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import diseaseRoutes from './routes/diseaseRoutes.js';
import emergencyCaseRoutes from './routes/emergencyCaseRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import testsRoutes from './routes/testsRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend to connect
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from the uploads directory
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/testtypes', testTypeRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/cashier', cashierRoutes);
app.use('/api/payments', paymentsRouter);
app.use('/api/pharmacist', pharmacistRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/emergency-cases', emergencyCaseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/diseases', testsRoutes);
app.use('/api', billingRoutes);
app.use('/api', feedbackRoutes);

// Temporary route to test findById
app.get('/test-user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for feedback submission
  socket.on('submitFeedback', (feedback) => {
    console.log('Feedback received:', feedback);

    // Broadcast the feedback to the admin
    io.emit('newFeedback', feedback);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Export the `io` instance
export { io };

// Initialize database and start server
const initDB = async () => {
  await User.createTable();
  await User.createAdmin();
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await initDB();
  console.log(`Server running on port ${PORT}`);
});