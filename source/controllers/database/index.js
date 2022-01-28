// import * as Library from "./../../library/index.js";

import Library from "@cloud-technology/library";

/// --> Utilities
import { Normalize } from "./../../utilities/configuration.js";

/// --> Controller(s)
import { default as User } from "./user/index.js";

/// --> Base Controller
const Controller = Library.Router();
Controller.get("/", async (request, response) => {
    response.send(Normalize(request, response).toJSON());
});

/// --> Route(s)
Controller.use("/user", User);

export default Controller;