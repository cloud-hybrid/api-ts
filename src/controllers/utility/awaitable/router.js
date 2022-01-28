import { Awaitable } from "./api.js";

import { Controller } from "./controller.js";

import { Normalize } from "./../../../utilities/configuration.js";

import * as Parameters from "querystring";

Controller.get("/", async (request, response) => {
    const $ = JSON.stringify(Parameters.parse(request.url.replace("?", "").replace("/", "")), null, 4);

    const Arguments = JSON.parse($);

    const Duration = (Arguments["Duration"] || Arguments["duration"] || 1) * 1000;

    if ( Duration >= 10000 ) {
        response.type("Application/JSON");
        response.status(417);
        response.setHeader("Expect", "Duration < 10");

        response.send();
    } else {
        await Awaitable(Duration);
        const Query = Normalize(request, response, {Duration});
        const Response = Query.toJSON();

        console.debug("[Debug]", "Request" + ":", request.originalUrl);

        response.send(Response);
    }
});

export default Controller;
