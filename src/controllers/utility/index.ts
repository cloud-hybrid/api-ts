import { Router } from "@cloud/library";

import { Awaitable } from "./awaitable";

const Controller = Router();
Controller.use("/", Awaitable);

export { Controller as Utilities };
export default Controller;