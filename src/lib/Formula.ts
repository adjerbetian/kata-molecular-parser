export type Formula = FormulaBlock[];
export type FormulaBlock = ElementBlock | MultiplicationBlock | Formula;
export type ElementBlock = string;
export interface MultiplicationBlock {
  multiplier: number;
  formula: Formula;
}

export const Block = {
  isElement,
  isFormula,
  isMultiplier,
};

function isElement(block: FormulaBlock): block is ElementBlock {
  return typeof block === "string";
}
function isFormula(block: FormulaBlock): block is Formula {
  return Array.isArray(block);
}
function isMultiplier(block: FormulaBlock): block is MultiplicationBlock {
  return !isElement(block) && !isFormula(block);
}
