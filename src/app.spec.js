const supertest = require("supertest");
const { expect } = require("chai");
const app = require("./app.js");

const request = supertest(app);

describe("app", function () {
  it("GET /", async () => {
    const result = await request.get("/").expect(200);

    expect(result.body.Output).to.include("Hello");
    expect(result.header).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
  });

  it("POST /", async () => {
    const result = await request.post("/").expect(200);

    expect(result.body.Output).contains("Hello");
    expect(result.header).to.have.property(
      "content-type",
      "application/json; charset=utf-8"
    );
  });
});
