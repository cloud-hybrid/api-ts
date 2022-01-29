import { Server } from "./index";
import { Middleware } from "./middleware";
import { Controller } from "./controllers";

const Application = Server();

await Middleware(Application);

Application.use("/", Controller);

Application.listen(3443, "0.0.0.0");
