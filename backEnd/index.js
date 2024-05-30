import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import Book from './models/bookModels.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

// Route to save a new book
app.post('/books', async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;

        if (!title || !author || !publishedYear) {
            return res.status(400).send({
                message: 'Please fill all fields',
            });
        }

        const book = new Book({
            title,
            author,
            publishedYear,
        });

        await book.save();

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get all books

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).send(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

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