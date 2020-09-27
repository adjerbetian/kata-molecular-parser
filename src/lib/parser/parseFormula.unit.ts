import { expect } from "chai";
import { parseFormula } from "./parseFormula";
import { Formula } from "../Formula";

describe("parseFormula", () => {
  it("should parse elements", () => {
    expectInput("He").toBeParsedTo(["He"]);
    expectInput("NaCl").toBeParsedTo(["Na", "Cl"]);
  });
  it("should parse multipliers", () => {
    expectInput("H2").toBeParsedTo([
      {
        multiplier: 2,
        formula: ["H"],
      },
    ]);
    expectInput("H2O").toBeParsedTo([
      {
        multiplier: 2,
        formula: ["H"],
      },
      "O",
    ]);
    expectInput("C2H4OH").toBeParsedTo([
      {
        multiplier: 2,
        formula: ["C"],
      },
      {
        multiplier: 4,
        formula: ["H"],
      },
      "O",
      "H",
    ]);
  });
  it("should parse brackets", () => {
    expectInput("Mg(OH)2").toBeParsedTo([
      "Mg",
      {
        multiplier: 2,
        formula: ["O", "H"],
      },
    ]);
    expectInput("Zn(CH3COO)2(H2O)2").toBeParsedTo([
      "Zn",
      {
        multiplier: 2,
        formula: ["C", { multiplier: 3, formula: ["H"] }, "C", "O", "O"],
      },
      {
        multiplier: 2,
        formula: [{ multiplier: 2, formula: ["H"] }, "O"],
      },
    ]);
    expectInput("K4[ON(SO3)2]2").toBeParsedTo([
      {
        multiplier: 4,
        formula: ["K"],
      },
      {
        multiplier: 2,
        formula: [
          "O",
          "N",
          {
            multiplier: 2,
            formula: ["S", { multiplier: 3, formula: ["O"] }],
          },
        ],
      },
    ]);
  });

  describe.skip("error cases", () => {
    it("should throw on non valid elements", () => {
      throw "todo";
    });
    it("should throw on non valid multiplier", () => {
      // example: 2H
      throw "todo";
    });
    it("should throw when brackets are not balanced", () => {
      // example: Mg(OH]2
      throw "todo";
    });
  });
});

function expectInput(input: string) {
  return {
    toBeParsedTo(formula: Formula) {
      expect(parseFormula(input)).to.deep.equal(formula);
    },
  };
}
