const express = require('express');
const apiRouter = require('../routers/resume');

const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

app.use(apiRouter); // Use the API router for handling resume routes

module.exports = app;
