import supertest from "supertest";
import { expect } from "chai";
import { app } from "./app";
import { StatusCodes } from "http-status-codes";

const request = supertest(app);

describe("app", function () {
  describe("GET /", () => {
    it("should return the composition", async () => {
      const result = await request
        .get("/")
        .query({ formula: "H20" })
        .expect(StatusCodes.OK);

      expect(result.body).to.deep.equal({ H: 2, O: 1 });
    });
    it("should fail when no formula is given", async () => {
      await request.get("/").expect(StatusCodes.BAD_REQUEST);
    });
    it.skip("should fail on invalid formula", async () => {
      await request
        .get("/")
        .query({ formula: "H[20" })
        .expect(StatusCodes.BAD_REQUEST);
    });
  });
  describe("GET /non-existing", () => {
    it("should return a 404 Not Found", async () => {
      await request.get("/non-existing").expect(StatusCodes.NOT_FOUND);
    });
  });
});
