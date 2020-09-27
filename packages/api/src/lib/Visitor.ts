import { FormulaError } from "../errors";
import { Block, ElementBlock, Formula, MultiplicationBlock } from "./Formula";

export function visitFormula<Result>(
  formula: Formula,
  visitors: Visitors<Result>
): Result {
  return visit(formula);

  function visit(block: Block): Result {
    if (Block.isFormula(block)) return visitors.formula(block, visit);
    if (Block.isElement(block)) return visitors.element(block, visit);
    if (Block.isMultiplier(block)) return visitors.multiplier(block, visit);
    throwNonRecognizedBlock(block);
  }
  function throwNonRecognizedBlock(block: never): never {
    throw new FormulaError(
      `The block "${JSON.stringify(block)}" is not recognized`
    );
  }
}

interface Visitors<Result> {
  formula: Visitor<Formula, Result>;
  multiplier: Visitor<MultiplicationBlock, Result>;
  element: Visitor<ElementBlock, Result>;
}
interface Visitor<BlockType, Result> {
  (block: BlockType, visit: (block: Block) => Result): Result;
}
