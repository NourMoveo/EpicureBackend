import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
