import { elements } from "../elements";
import { FormulaError } from "../../errors";
import { Formula, FormulaBlock, MultiplicationBlock } from "../Formula";
import { brackets } from "./brackets";

export function parseFormula(input: string) {
  const result: Formula = [];

  let i = 0;
  while (i < input.length) {
    if (elements.includes(input.substring(i, i + 2))) {
      result.push(buildElementBlock(input.substring(i, i + 2)));
      i += 2;
    } else if (elements.includes(input[i])) {
      result.push(buildElementBlock(input[i]));
      i++;
    } else if (input.substring(i).match(/^\d+/)) {
      const n = input.substring(i).match(/^\d+/)![0];
      result.push(buildMultiplicationBlock(parseInt(n, 10), result.pop()!));
      i += n.length;
    } else if (brackets.isOpening(input[i])) {
      const end = brackets.getClosingIndex(input, i);
      result.push(parseFormula(input.substring(i + 1, end)));
      i = end + 1;
    } else {
      throw new FormulaError(
        `Unrecognized element at char ${i + 1} in ${input}`
      );
    }
  }

  return result;
}

function buildElementBlock(element: string) {
  return element;
}
function buildMultiplicationBlock(
  multiplier: number,
  block: FormulaBlock
): MultiplicationBlock {
  if (Array.isArray(block)) {
    return { multiplier, formula: block };
  } else {
    return { multiplier, formula: [block] };
  }
}
