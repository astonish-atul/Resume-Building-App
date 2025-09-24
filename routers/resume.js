const express = require('express');
const apiRouter = express.Router();
const fs = require('fs');
const { ValidateFields, ValidateHeaders } = require('../src/validation');
const { GeneratePDF } = require('../src/pdf');
const { docxPaths } = require('../src/constants');

// POST route for generating a resume
apiRouter.post('/resume', async (req, res) => {
  // Validate request headers
  const headersError = ValidateHeaders(req);
  if (headersError) {
    return res.status(401).json({ error: headersError });
  }

  // Validate request fields
  const fieldsError = ValidateFields(req);
  if (fieldsError) {
    return res.status(400).json({ error: fieldsError });
  }

  try {
    const {
      template_id,
      personal_information,
      job_title,
      career_objective,
      skills,
      education,
      experience,
      achievements
    } = req.body;

    // Check if the specified template_id exists
    if (!docxPaths.hasOwnProperty(template_id)) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Generate the PDF file
    const outputPath = await GeneratePDF(req.body);
    const pdfContent = fs.readFileSync(outputPath);

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Send the PDF file as the response
    res.send(pdfContent);

    // Clean up the temporary file
    fs.unlinkSync(outputPath);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = apiRouter;

