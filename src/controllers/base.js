import Library from "@cloud-technology/library";

import { Generator } from "./../utilities/configuration.js";

export const Controller = Library.Router();

Controller.get("/", async (request, response) => {
    const Package = JSON.parse(process.env?.package ?? null);

    const $ = Generator(request, Package);

    const Body = Package?.version;

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    if (process.env.NODE_ENV !== "production") {
        response.send(JSON.stringify(Package, null, 4));
    } else {
        response.send(JSON.stringify({ Version: Body }, null, 4));
    }
});

Controller.get("/health", function (req, res) {
    res.send("Online");
});
