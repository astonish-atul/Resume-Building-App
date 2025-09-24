# Resume Generator API using AdobePdfServices SDK

This is a Express.js API with UI for users to interact and send a
POST request for generating professional resumes using the AdobePdfServices SDK.


## Setup
```
To set up the API, follow these steps:

1. Set up AdobePdfServices credentials by following the instructions avail here (https://developer.adobe.com/document-services/docs/overview/document-generation-api/quickstarts/nodejs/).

2. Install the application's dependencies using command "npm install"
   
3. Place the pdfservices-api-credentials.json file in the root folder of the project.
create .env file , str shown below

PDF_SERVICES_CLIENT_ID=************************
PDF_SERVICES_CLIENT_SECRET=******************************
```
## Tech Stack
```
1.Jest
2.EJS
3.Express
4.AdobePdfServices SDK
```
## API Endpoints

The API provides the following endpoint:

POST /resume: Generates a resume in PDF format based on the provided data.

## Usage
```
To use the API:

1. Start the API server by running the command "npm run dev"

2. Send a POST request to "http://localhost:8080/resume" with the  necessary data in the request body
   to generate a resume in PDF format and the user interface is hosted at "http://localhost:3000".
```

To run the unit tests and view the results, use the command "npm test"




