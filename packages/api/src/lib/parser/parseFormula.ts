import { elements } from "../elements";
import { FormulaError } from "../../errors";
import { Block, Formula, MultiplicationBlock } from "../Formula";
import { brackets } from "./brackets";

export function parseFormula(input: string) {
  const result: Formula = [];
  const cursor = buildCursor();
  doParseFormula();
  return result;

  function doParseFormula() {
    while (cursor.isValid()) {
      if (cursor.is2LetterElement()) handle2LetterElement();
      else if (cursor.is1LetterElement()) handle1LetterElement();
      else if (cursor.isMultiplier()) handleMultiplier();
      else if (cursor.isSubFormula()) handleSubFormula();
      else {
        throw new FormulaError(
          `Unrecognized element at char ${cursor.position + 1} in ${input}`
        );
      }
    }
  }

  function handle2LetterElement() {
    result.push(buildElementBlock(cursor.char2));
    cursor.moveOf(2);
  }
  function handle1LetterElement() {
    result.push(buildElementBlock(cursor.char));
    cursor.moveOf(1);
  }
  function handleMultiplier() {
    const n = parseInt(cursor.match(/^\d+/)![0], 10);

    const lastElement = result.pop();
    if (!lastElement)
      throw new FormulaError(
        `invalid multiplier ${n} at index ${cursor.position}`
      );

    result.push(buildMultiplicationBlock(n, lastElement));
    cursor.moveOf(`${n}`.length);
  }
  function handleSubFormula() {
    const start = cursor.position + 1;
    const end = brackets.getClosingIndex(input, cursor.position);
    const subFormula = input.substring(start, end);
    result.push(parseFormula(subFormula));
    cursor.moveTo(end + 1);
  }

  function buildCursor() {
    let i = 0;

    return {
      get position() {
        return i;
      },
      get char() {
        return input[i];
      },
      get char2() {
        return input.substring(i, i + 2);
      },
      match(rgx: RegExp) {
        return input.substring(i).match(rgx);
      },
      moveOf(increment: number) {
        i += increment;
      },
      moveTo(position: number) {
        i = position;
      },
      isValid() {
        return i < input.length;
      },

      is2LetterElement() {
        return elements.includes(input.substring(i, i + 2));
      },
      is1LetterElement() {
        return elements.includes(input[i]);
      },
      isMultiplier() {
        return input.substring(i).match(/^\d+/);
      },
      isSubFormula() {
        return brackets.isOpening(input[i]);
      },
    };
  }
}

function buildElementBlock(element: string) {
  return element;
}
function buildMultiplicationBlock(
  multiplier: number,
  block: Block
): MultiplicationBlock {
  if (Array.isArray(block)) {
    return { multiplier, formula: block };
  } else {
    return { multiplier, formula: [block] };
  }
}
