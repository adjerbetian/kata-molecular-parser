import { Controller } from "../types";
import { HttpError } from "../errors";
import * as lib from "../lib";

export const getComposition: Controller = (req) => {
  const { formula } = req.query;

  if (!(typeof formula === "string")) {
    throw new HttpError(400, "no formula given");
  }

  return lib.getComposition(formula);
};
