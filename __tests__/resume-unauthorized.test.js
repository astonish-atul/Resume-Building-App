const supertest = require("supertest");
const app = require("../src/api-app");
const { expect } = require("@jest/globals");
const { resumeSuccessData } = require('../src/constants');
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

describe("POST /resume", () => {
  test("should respond with a 401 status code when no Accept header is provided", async () => {
    const response = await supertest(app)
      .post("/resume")
      .send(resumeSuccessData);

    expect(response.status).toEqual(401);
  }, 30000);

  test("should respond with a 401 status code when an invalid Accept header is provided", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/json")
      .send(resumeSuccessData);

    expect(response.status).toEqual(401);
  }, 30000);

  const resumeSuccessDataString = JSON.stringify(resumeSuccessData);

  test("should respond with a 401 status code when an invalid Content-Type header is provided", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "text/plain")
      .send(resumeSuccessDataString);

    expect(response.status).toEqual(401);
  }, 30000);

  test("should respond with a 401 status code when invalid Accept and Content-Type headers are provided", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/json")
      .set("Content-Type", "text/plain")
      .send(resumeSuccessDataString);

    expect(response.status).toEqual(401);
  }, 30000);
});
