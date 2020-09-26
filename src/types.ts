import { Request } from "express";

export interface Route {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  controller: Controller;
}

export interface Controller {
  (req: Request): any;
}
