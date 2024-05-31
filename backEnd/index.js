import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors'

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
});

// Use the books routes
app.use('/books', booksRoutes);

mongoose
    .connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });