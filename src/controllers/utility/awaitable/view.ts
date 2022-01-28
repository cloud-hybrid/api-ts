import { Router } from "@cloud/library";

import { Awaitable } from "./context";

const Parameters = URLSearchParams;

const Controller = Router();
Controller.get("/", async (request, response) => {
    const $ = JSON.stringify(new Parameters(request.url.replace("?", "").replace("/", "")), null, 4);

    const Arguments = JSON.parse($);

    const Duration = (Arguments["Duration"] || Arguments["duration"] || 1) * 1000;

    if ( Duration >= 10000 ) {
        response.type("Application/JSON");
        response.status(417);
        response.setHeader("Expect", "Duration < 10");

        response.send();
    } else {
        const $ = JSON.stringify({ Duration }, null, 4);

        await Awaitable(Duration);

        response.statusCode = 200;
        response.statusMessage = "Online";

        response.setHeader( "Content-Type", "Application/JSON");

        response.send($);
    }
});

export { Controller as Awaitable };

export default Controller;
