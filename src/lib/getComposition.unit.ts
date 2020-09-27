import { expect } from "chai";
import { Composition, getComposition } from "./getComposition";

describe("getComposition", () => {
  it("should return the composition of the molecule", () => {
    expectInput("").toHaveComposition({});
    expectInput("He").toHaveComposition({ He: 1 });
    expectInput("H2O").toHaveComposition({ H: 2, O: 1 });
    expectInput("K4[ON(SO3)2]2").toHaveComposition({ K: 4, O: 14, N: 2, S: 4 });
    expectInput("(NH4)(NO3)").toHaveComposition({ N: 2, H: 4, O: 3 });
  });
});

function expectInput(input: string) {
  return {
    toHaveComposition(expected: Composition) {
      return expect(getComposition(input)).to.deep.equal(expected);
    },
  };
}
