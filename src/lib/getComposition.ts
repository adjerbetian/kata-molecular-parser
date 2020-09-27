import { parseFormula } from "./parser";
import { Formula, FormulaBlock, MultiplicationBlock } from "./Formula";
import { FormulaError } from "../errors";

export interface Composition extends Record<string, number> {}

export function getComposition(input: string) {
  if (!input) return {};

  const formula = parseFormula(input);
  return getFormulaComposition(formula);
}
function getFormulaComposition(formula: Formula): Composition {
  return formula.reduce((composition, block) => {
    if (isElement(block)) {
      composition[block] = (composition[block] || 0) + 1;
    } else if (isMultiplier(block)) {
      composition = addCompositions(
        composition,
        multiplyComposition(
          getFormulaComposition(block.formula),
          block.multiplier
        )
      );
    } else if (isFormula(block)) {
      composition = addCompositions(composition, getFormulaComposition(block));
    } else {
      throwNonRecognizedBlock(block);
    }
    return composition;
  }, {} as Composition);
}
function throwNonRecognizedBlock(block: never): never {
  throw new FormulaError(
    `The block "${JSON.stringify(block)}" is not recognized`
  );
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

function isElement(block: FormulaBlock): block is string {
  return typeof block === "string";
}
function isFormula(block: FormulaBlock): block is Formula {
  return Array.isArray(block);
}
function isMultiplier(block: FormulaBlock): block is MultiplicationBlock {
  return !isElement(block) && !isFormula(block);
}
