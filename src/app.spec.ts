import supertest from "supertest";
import { expect } from "chai";
import { app } from "./app";
import { StatusCodes } from "http-status-codes";

const request = supertest(app);

describe("app", function () {
  describe("GET /", () => {
    it("should return a status 200", async () => {
      const result = await getComposition("H2O");

      expect(result.status).to.equal(200);
    });
    // prettier-ignore
    it("should return the composition", async () => {
      expect((await getComposition("")).body).to.deep.equal({});
      expect((await getComposition("H2")).body).to.deep.equal({ H: 2 });
      expect((await getComposition("H2O")).body).to.deep.equal({ H: 2, O: 1 });
      expect((await getComposition("K4[ON(SO3)2]2")).body).to.deep.equal({ K: 4, O: 14, N: 2, S: 4 });
    });

    describe("bad requests", () => {
      it("should fail when no formula is given", async () => {
        const res = await request.get("/");

        expect(res.status).to.equal(StatusCodes.BAD_REQUEST);
        expect(res.text).to.equal("no formula given");
      });
      it("should fail on invalid element name", async () => {
        const res = await getComposition("h2O");

        expect(res.status).to.equal(StatusCodes.BAD_REQUEST);
        expect(res.text).to.equal("Unrecognized element at char 1 in h2O");
      });
      it("should fail on invalid bracket balance", async () => {
        const res = await getComposition("H2[0");

        expect(res.status).to.equal(StatusCodes.BAD_REQUEST);
        expect(res.text).to.equal(
          `no closing bracket found for "[" at index 3 in "H2[0"`
        );
      });
    });

    async function getComposition(formula: string) {
      return request.get("/").query({ formula });
    }
  });
  describe("GET /non-existing", () => {
    it("should return a 404 Not Found", async () => {
      await request.get("/non-existing").expect(StatusCodes.NOT_FOUND);
    });
  });
});
