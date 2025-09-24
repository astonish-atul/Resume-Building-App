const supertest = require("supertest");
const app = require("../src/api-app");
const { expect } = require("@jest/globals");
const { resumeSuccessData } = require('../src/constants');
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server started on port ${port}`);
});

describe("POST /resume", () => {
  test("should respond with a 404 status code when an invalid template ID is provided", async () => {
    resumeSuccessData["template_id"] = "78";
    const response = await supertest(app)
      .post("/resume")
      .set("Accept", "application/pdf")
      .set("Content-Type", "application/json")
      .send(resumeSuccessData);

    expect(response.status).toEqual(404);
  }, 30000);
});
