import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import User from './models/userModel.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const initDB = async () => {
    await User.createTable();
    await User.createAdmin();
};

app.listen(PORT, async () => {
    await initDB();
    console.log(`Server running on port ${PORT}`);
});
