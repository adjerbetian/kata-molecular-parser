import { Controller } from "../types";
import { FormulaError, HttpError } from "../errors";
import * as lib from "../lib";
import { StatusCodes } from "http-status-codes";

export const getComposition: Controller = (req) => {
  const { formula } = req.query;

  if (!(typeof formula === "string")) {
    throw new HttpError(StatusCodes.BAD_REQUEST, "no formula given");
  }

  try {
    return lib.getComposition(formula);
  } catch (err) {
    if (err instanceof FormulaError) {
      throw new HttpError(StatusCodes.BAD_REQUEST, err.message);
    }
    throw err;
  }
};
