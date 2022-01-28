import Library from "./../../library/index.js";

/// --> Utilities
import { Normalize } from "./../../utilities/configuration.js";

/// --> Controller(s)
import { default as URLs } from "./urls/index.js";
import { default as Projects } from "./projects/index.js";

/// --> Base Controller
const Controller = Library.Router();
Controller.get("/", async (request, response) => {
    response.send(Normalize(request, response).toJSON());
});

/// --> Route(s)
Controller.use("/urls", URLs);
Controller.use("/projects", Projects);

export default Controller;