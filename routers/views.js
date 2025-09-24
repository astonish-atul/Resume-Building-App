const express = require('express');
const viewRouter = express.Router();

// Route to render the form view
viewRouter.get('/', (req, res) => {
  // Render the 'form' view
  res.render('form');
});

module.exports = viewRouter;
