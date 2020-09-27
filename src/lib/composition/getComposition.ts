import { parseFormula } from "../parser";
import { Formula } from "../Formula";
import { visitFormula } from "../Visitor";
import { Composition } from "./Composition";

export function getComposition(input: string) {
  if (!input) return {};

  const formula = parseFormula(input);
  return getFormulaComposition(formula);
}
function getFormulaComposition(formula: Formula): Composition {
  return visitFormula<Composition>(formula, {
    formula(formula, visit) {
      return formula.reduce((composition, block) => {
        return Composition.add(composition, visit(block));
      }, {} as Composition);
    },
    multiplier(block, visit) {
      return Composition.multiply(visit(block.formula), block.multiplier);
    },
    element(element) {
      return { [element]: 1 };
    },
  });
}
