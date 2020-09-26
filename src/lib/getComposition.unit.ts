import { expect } from "chai";
import { getComposition } from "./getComposition";

describe("getComposition", () => {
  it("should return the composition of a H20", () => {
    const result = getComposition("H20");

    expect(result).to.deep.equal({
      H: 2,
      O: 1,
    });
  });
  it("should return an empty composition", () => {
    const result = getComposition("");

    expect(result).to.be.empty;
  });
});
