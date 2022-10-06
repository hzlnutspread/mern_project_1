// starting point of server aplication
// npm init -y to install empty package.json to install depencies
// in the package.json, npm install:
// body-parser = enable use to send post requests with bodies
// cors = cross origin requests
// express = framework for routing
// mongoose = the database for creating models for the posts

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

// Every express app has this first
const app = express();
dotenv.config();

// Use express middleware

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Every route inside of postRoutes will start at /posts not at /
app.use('/posts', postRoutes);

// connect to mongo
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

