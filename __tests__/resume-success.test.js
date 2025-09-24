const supertest = require("supertest");
const app = require("../src/api-app");
const { expect } = require("@jest/globals");
const { resumeSuccessData } = require('../src/constants');
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

describe("POST /resume", () => {
  test("should respond with a 200 status code and generate a PDF file", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(resumeSuccessData);

    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
    expect(response.headers['content-disposition']).toEqual('attachment; filename=resume.pdf');
  }, 60000);

  test("should respond with a 200 status code and generate a PDF file (without specifying Content-Type)", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .send(resumeSuccessData);

    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
    expect(response.headers['content-disposition']).toEqual('attachment; filename=resume.pdf');
  }, 60000);
});
