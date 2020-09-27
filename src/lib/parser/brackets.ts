import _ from "lodash";
import { FormulaError } from "../../errors";

export const brackets = {
  isOpening(character: string) {
    return ["(", "[", "{"].includes(character);
  },
  isPair(opening: string, closing: string) {
    return ["()", "[]", "{}"].includes(opening + closing);
  },
  getClosingIndex(text: string, index: number) {
    const brackets = [text[index]];
    index++;

    while (brackets.length > 0) {
      if (index >= text.length) throwNonBalancedString(text);

      if (this.isOpening(text[index])) {
        brackets.push(text[index]);
      }
      if (this.isPair(_.last(brackets)!, text[index])) {
        brackets.pop();
      }

      index++;
    }
    return index - 1;
  },
};

function throwNonBalancedString(text: string): never {
  throw new FormulaError(
    `no closing bracket found for "${text[0]}" in "${text}"`
  );
}
