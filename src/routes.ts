import { Route } from "./types";
import * as controllers from "./controllers";

export const routes: Route[] = [
  {
    path: "/",
    method: "GET",
    controller: controllers.getComposition,
  },
];
