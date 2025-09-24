const supertest = require("supertest");
const app = require("../src/api-app");
const { expect } = require("@jest/globals");
const { resumeSuccessData, resumeFieldTypes, personalInformationFieldTypes,educationFieldTypes,achievementFieldTypes,experienceFieldTypes,notMatchingLinkedInURLs,notMatchingPhoneNumbers,notMatchingEmails} = require('../src/constants');


const resumeFieldKeys = Object.keys(resumeFieldTypes);
const personalInformationFieldKeys = Object.keys(personalInformationFieldTypes);
const educationFieldKeys = Object.keys(educationFieldTypes);
const experienceFieldKeys = Object.keys(experienceFieldTypes);
const achievementFieldKeys=Object.keys(achievementFieldTypes);
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

function ExcludeParameter(data, paramName) {
  const newData = JSON.parse(JSON.stringify(data));
  delete newData[paramName];
  return newData;
}

describe("POST /resume with empty data", () => {
  test("should respond with a 400 status code", async () => {
    const data = {};
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(data);

    expect(response.status).toEqual(400);
  }, 30000);
});

describe("POST /resume with missing required fields", () => {
  for (const field of resumeFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing`, async () => {
      const paramName = field;
      const data = ExcludeParameter(resumeSuccessData, paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with invalid data types for fields", () => {
  for (const field of resumeFieldKeys) {
    test(`should respond with a 400 status code when ${field} has an invalid data type`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data[field] = 12222;
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with objects instead of arrays", () => {
  for (const field in resumeFieldTypes) {
    if (resumeFieldTypes[field] === "array") {
      test(`should respond with a 400 status code when ${field} has an object instead of an array`, async () => {
        const data = JSON.parse(JSON.stringify(resumeSuccessData));
        data[field] = data[field][0];
        const response = await supertest(app)
          .post("/resume")
          .set("Accept", "application/pdf")
          .set("Content-Type", "application/json")
          .send(data);

        expect(response.status).toEqual(400);
      }, 30000);
    }
  }
});

describe("POST /resume with missing fields in personal information", () => {
  for (const field of personalInformationFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in personal information`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.personal_information = ExcludeParameter(resumeSuccessData.personal_information, paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with wrong data types in personal information fields", () => {
  for (const field of personalInformationFieldKeys) {
    test(`should respond with a 400 status code when ${field} has an invalid data type in personal information`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data.personal_information[field] = 12222;
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);

      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with phone_number not matching to  regex pattern in personal details", () => {
  for(phone_number in notMatchingPhoneNumbers)
  {
    test(`should respond with a 400 status code when phone_number has an invalid data type in personal information (scenario: alphanumeric value)`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data.personal_information["phone_number"] = phone_number;
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
  
      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with invalid LinkedIn URL  personal details", () => {
  for (url in notMatchingLinkedInURLs)
  {
    test(`should respond with a 400 status code ${url} not satisfy general linkedin profile url regex pattern`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data.personal_information["linkedin_url"] = url;
      const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(data);
      
      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with invalid Email in personal details", () => {
  for (email in notMatchingEmails)
  {
    test(`should respond with a 400 status code ${url} not satisfy general linkedin profile url regex pattern`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      data.personal_information["email_address"] = email;
      const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(data);
      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with missing fields in education", () => {
  for (const field of educationFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in education`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.education[0] = ExcludeParameter(resumeSuccessData.education[0], paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
      expect(response.status).toEqual(400);
    }, 30000);
  }
});
describe("POST /resume with missing fields in exeperience", () => {
  for (const field of experienceFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in education`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.experience[0] = ExcludeParameter(resumeSuccessData.experience[0], paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
      expect(response.status).toEqual(400);
    }, 30000);
  }
});

describe("POST /resume with missing fields in exeperience", () => {
  for (const field of experienceFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in education`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.experience[0] = ExcludeParameter(resumeSuccessData.experience[0], paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
      expect(response.status).toEqual(400);
    }, 30000);
  }
});
describe("POST /resume with missing fields in achievements", () => {
  for (const field of achievementFieldKeys) {
    test(`should respond with a 400 status code when ${field} is missing in achievement`, async () => {
      const data = JSON.parse(JSON.stringify(resumeSuccessData));
      const paramName = field;
      data.achievements[0] = ExcludeParameter(resumeSuccessData.achievements[0], paramName);
      const response = await supertest(app)
        .post("/resume")
        .set("Accept", "application/pdf")
        .set("Content-Type", "application/json")
        .send(data);
      expect(response.status).toEqual(400);
    }, 30000);
  }
});
