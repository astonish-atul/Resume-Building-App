const supertest = require("supertest");
const app = require("../src/api-app");
const { resumeSuccessData } = require('../src/constants');
const { expect } = require("@jest/globals");


const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

jest.mock('../src/pdf', () => ({
  GeneratePDF : jest.fn().mockImplementation(() => {
    throw new Error('Internal Server Error');
  }),
}));

describe("POST /resume", () => {
  test("should respond with a 500 status code and Internal Server Error message", async () => {
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(resumeSuccessData);

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  }, 30000);
});
