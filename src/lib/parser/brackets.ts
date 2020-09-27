import _ from "lodash";
import { FormulaError } from "../../errors";

export const brackets = {
  isOpening(character: string) {
    return ["(", "[", "{"].includes(character);
  },
  isPair(opening: string, closing: string) {
    return ["()", "[]", "{}"].includes(opening + closing);
  },
  getClosingIndex(text: string, openingIndex: number) {
    const brackets = [text[openingIndex]];
    let closingIndex = openingIndex + 1;

    while (brackets.length > 0) {
      if (closingIndex >= text.length)
        throwNonBalancedString(text, openingIndex);

      if (this.isOpening(text[closingIndex])) {
        brackets.push(text[closingIndex]);
      }
      if (this.isPair(_.last(brackets)!, text[closingIndex])) {
        brackets.pop();
      }

      closingIndex++;
    }
    return closingIndex - 1;
  },
};

function throwNonBalancedString(text: string, index: number): never {
  throw new FormulaError(
    `no closing bracket found for "${text[index]}" at index ${
      index + 1
    } in "${text}"`
  );
}
