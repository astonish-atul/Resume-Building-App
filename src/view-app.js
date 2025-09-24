const express = require('express');
const viewRouter = require('../routers/views');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(express.static('public')); // Middleware to serve static files from the 'public' directory

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join('views')); // Set the directory for views

// View router
app.use('/', viewRouter); // Use the view router for handling routes

module.exports = app;
