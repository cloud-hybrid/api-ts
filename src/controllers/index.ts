//import { default as GitHub } from "./github/index.js";
//import { default as GitLab } from "./gitlab/index.js";
//import { default as Utility } from "./utility/index.js";
//import { default as Database } from "./database/index.js";
//import { default as Authorization } from "./authorization/index.js";

import { Router } from "library";

import { Utilities } from "./utility";

export const Controller = Router();

const Online = () => JSON.stringify({ Status: "Online" }, null, 4);
Controller.get("/", async (_, response) => {
    response.shouldKeepAlive = true;
    response.statusMessage = "Online";
    response.statusCode = 200;

    response.setHeader("Keep-Alive", 5);
    response.setHeader("Content-Type", "Application/JSON");

    response.write(Online());

    response.send();
});

Controller.use("/utility", Utilities);

// Controller.use("/gitlab", GitLab);
// Controller.use("/github", GitHub);
// Controller.use("/utility", Utility);
// Controller.use("/database", Database);
// Controller.use("/authorization", Authorization);

export default Controller;