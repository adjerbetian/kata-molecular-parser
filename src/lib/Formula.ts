export type Formula = FormulaBlock[];
export type FormulaBlock = string | MultiplicationBlock | Formula;

export interface MultiplicationBlock {
  multiplier: number;
  formula: Formula;
}
