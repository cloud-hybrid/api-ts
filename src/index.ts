import { API } from "library";

import { Middleware } from "./middleware";
import { Controller } from "./controllers";

const Application = API();

export { Application, Controller, Middleware };
