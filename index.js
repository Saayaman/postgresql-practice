const express = require('express');
const cors = require('cors');
const { Client } = require('pg')
const { pool } = require('./postgres')
require('dotenv').config();

// const uuidv1 = require('uuid/v1');
// const mongoose = require('mongoose');


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');

const app = express();

//allow cors anywhere
app.use(cors());

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // using querystring instead of qs

app.get('/api', (req, res) => {
 res.send('Hiiiiii');
});

app.get('/api/books', (req, res) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

app.post = (request, response) => {
  const { author, title } = request.body
  pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Book added.' })
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

//exporst.<text> part is same as package.json rewrite function
exports.app = functions.https.onRequest(app)
