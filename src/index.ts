import { API } from "@cloud/library";

import { Middleware } from "./middleware";
import { Controller } from "./controllers";

const Application = API();

function Server (): typeof Application {
    return Application;
}

export { Application, Server, Middleware, Controller };