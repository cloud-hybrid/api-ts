import { Server, Middleware, Controller } from ".";

const Application = Server();

await Middleware(Application);

Application.use("/", Controller)
    .listen(3443);
