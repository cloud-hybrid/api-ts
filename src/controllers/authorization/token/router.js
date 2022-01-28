import { Controller } from "./controller.js";

import { Normalize } from "./../../../utilities/configuration.js";

import { Validate } from "./api.js";

Controller.post("/", async (request, response) => {
    console.debug("[Authorization (Token)]", "[Debug]", "Request" + " " + "-", {
        Origin: request.originalUrl,
        Query: request.query,
        Body: request.body,
        Headers: request.headers
    });

    const Header = request.header("Authorization");

    const Token = (Header) ? Header.split(" ").pop() : request.body["Token"] || request.body["token"] || request.header("X-Nexus-JWT-Access-Token") || request.query?.Token || request.query?.token ||
        request.body["JWT"] || request.body["jwt"] || request.header("X-JWT-Token") || request.header("X-JWT") || request.query?.JWT || request.query?.jwt ||
        null;

    if (Token === null) {
        response.statusCode = 401;
        response.shouldKeepAlive = false;
        response.statusMessage = "JWT Error";

        response.setHeader("WWW-Authenticate", "Realm Nexus-JWT-Validator");

        response.type("Application/JSON");
        response.send(JSON.stringify({
            Message: "JWT Required as Input",
            Error: "JWT",
            Realm: "Nexus",
            Status: 401
        }, null, 4));
    } else {
        const $ = await Validate(Token);

        const Query = Normalize(request, response, $);
        const Response = Query.toJSON();

        if (!$ || !$.Verification || $.Error) {
            console.error("[Authorization (Token)]", "[Error]", $);

            response.statusCode = 401;
            response.statusMessage = "Unauthorized";

            response.setHeader("WWW-Authenticate", "Realm Nexus-JWT-Validator");
        } else {
            console.debug("[Authorization (Token)]", "Validation := Successful");

            response.statusMessage = "Verified";
        }

        response.send(Response);
    }
});

export default Controller;
