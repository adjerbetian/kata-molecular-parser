import { FormulaError } from "../errors";
import {
  Block,
  ElementBlock,
  Formula,
  FormulaBlock,
  MultiplicationBlock,
} from "./Formula";

export function visitFormula<T>(
  formula: Formula,
  visitors: BlockVisitors<T>
): T {
  return visit(formula);

  function visit(block: FormulaBlock): T {
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

interface BlockVisitors<Result> {
  formula: BlockVisitorFunction<Formula, Result>;
  multiplier: BlockVisitorFunction<MultiplicationBlock, Result>;
  element: BlockVisitorFunction<ElementBlock, Result>;
}
interface BlockVisitorFunction<BlockType, Result> {
  (block: BlockType, visit: (block: FormulaBlock) => Result): Result;
}
