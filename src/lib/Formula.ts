export type Formula = Block[];
export type Block = ElementBlock | MultiplicationBlock | Formula;
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

function isElement(block: Block): block is ElementBlock {
  return typeof block === "string";
}
function isFormula(block: Block): block is Formula {
  return Array.isArray(block);
}
function isMultiplier(block: Block): block is MultiplicationBlock {
  return !isElement(block) && !isFormula(block);
}
