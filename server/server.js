import dotenv from 'dotenv'

dotenv.config();

import express from 'express'
import cors from 'cors'
import connectDB from './models/connectDB.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.end('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});