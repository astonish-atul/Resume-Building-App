const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');
const { docxPaths } = require('./constants');
const { v4: uuidv4 } = require('uuid');

// Function to extract relevant data from input
function GetData(data) {
  const {
    template_id,
    personal_information,
    job_title,
    career_objective,
    skills,
    education,
    experience,
    achievements
  } = data;

  const userData = {
    Name: personal_information.name,
    LastName: personal_information.last_name,
    EmailAddress: personal_information.email_address,
    PhoneNumber: personal_information.phone_number,
    LinkedIn: `<a href="${personal_information.linkedin_url}">LinkedIn</a>`,
    JobTitle: job_title,
    Summary: career_objective,
    Skills: skills,
    Education: education.map(edu => ({
      SchoolName: edu.school_name,
      Year: edu.passing_year,
      Description: edu.description
    })),
    Experience: experience.map(exp => ({
      CompanyName: exp.company_name,
      Year: exp.passing_year,
      Description: exp.responsibilities
    })),
    Achievements: achievements.map(ach => ({
      Type: ach.field,
      Description: ach.awards
    }))
  };
  const templateId=template_id;
  return { templateId, userData };
}

function GeneratePDF(data) {
  const { templateId, userData } = GetData(data);
  const inputFile = docxPaths[templateId];

  return new Promise((resolve, reject) => {
    const outputFileName = `resume_${uuidv4()}.pdf`; // Generate a unique file name using UUID
    const OUTPUT = `./temp/${outputFileName}`;
    const credentials = PDFServicesSdk.Credentials
      .servicePrincipalCredentialsBuilder()
      .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
      .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
      .build();
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const documentMerge = PDFServicesSdk.DocumentMerge;
    const documentMergeOptions = documentMerge.options;

    const options = new documentMergeOptions.DocumentMergeOptions(
      userData,
      documentMergeOptions.OutputFormat.PDF
    );

    const documentMergeOperation = documentMerge.Operation.createNew(options);
    const input = PDFServicesSdk.FileRef.createFromLocalFile(inputFile);
    documentMergeOperation.setInput(input);
    documentMergeOperation
      .execute(executionContext)
      .then(result => result.saveAsFile(OUTPUT))
      .then(() => resolve(OUTPUT))
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  GeneratePDF
};