import express, { Request, Response } from "express";
import { routes } from "./routes";
import { Controller } from "./types";
import { BaseError, HttpError } from "./errors";
import { StatusCodes } from "http-status-codes";
import cors from "cors";

export const app = express();

app.use(cors());

routes.forEach((route) => {
  const wrapper = wrapController(route.controller);
  if (route.method === "GET") app.get(route.path, wrapper);
  if (route.method === "POST") app.post(route.path, wrapper);
  if (route.method === "DELETE") app.delete(route.path, wrapper);
  if (route.method === "PATCH") app.patch(route.path, wrapper);
});
app.use((req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("Sorry cant find that!")
);

function wrapController(controller: Controller) {
  return (req: Request, res: Response) => {
    try {
      const result = controller(req);
      res.json(result);
    } catch (err) {
      handleError(res, err);
    }
  };
}

function handleError(res: Response, err: any) {
  if (err instanceof HttpError) {
    res.status(err.code).send(err.message);
  } else if (err instanceof BaseError) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  } else {
    if (process.env.NODE_ENV === "production") {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
