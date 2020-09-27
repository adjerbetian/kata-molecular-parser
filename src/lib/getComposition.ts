import { parseFormula } from "./parser";
import { Formula } from "./Formula";
import { visitFormula } from "./Visitor";

export interface Composition extends Record<string, number> {}

export function getComposition(input: string) {
  if (!input) return {};

  const formula = parseFormula(input);
  return getFormulaComposition(formula);
}
function getFormulaComposition(formula: Formula): Composition {
  return visitFormula<Composition>(formula, {
    formula(formula, visit) {
      return formula.reduce((composition, block) => {
        return addCompositions(composition, visit(block));
      }, {} as Composition);
    },
    multiplier(block, visit) {
      return multiplyComposition(visit(block.formula), block.multiplier);
    },
    element(element) {
      return { [element]: 1 };
    },
  });
}

function addCompositions(c1: Composition, c2: Composition): Composition {
  const result = { ...c1 };
  Object.entries(c2).forEach(([element, count]) => {
    result[element] = (result[element] || 0) + count;
  });
  return result;
}
function multiplyComposition(composition: Composition, n: number): Composition {
  return Object.fromEntries(
    Object.entries(composition).map(([element, count]) => [element, count * n])
  );
}
