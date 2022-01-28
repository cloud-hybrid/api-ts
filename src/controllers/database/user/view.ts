import { Router } from "@cloud/library";

import { default as User } from "./../../../database/model/user/index.js";

import { default as Username } from "./api/username.js";
import { default as Email } from "./api/email.js";

const Schema = async () => User.schema;
const Definition = async () => User.Definition;
const Statistics = async () => await User.collection.stats();

Context.get("/", async (request, response) => {
    const $ = {
        Schema: await Schema(),
        Model: await Definition(),
        Statistics: await Statistics()
    };

    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Request" + ":", request.originalUrl);
    console.debug("[Debug]", "Response" + ":", "[...]");

    response.send(Response);
});

Context.get("/email", async (request, response) => {
    const $ = Context.stack.filter(($) => $.route.path.includes("email")).map((Element) => {
        return {
            Parameters: Element?.params,
            Route: Element.route.path,
            Methods: Element.route.methods
        };
    });

    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

Context.get("/email/search", async (request, response) => {
    const $ = await Email.Search("administrator@internal.io");
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

Context.get("/email/available", async (request, response) => {
    const $ = await Email.Available("administrator@internal.io");
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

Context.get("/username", async (request, response) => {
    const $ = Context.stack.filter(($) => $.route.path.includes("username")).map((Element) => {
        return {
            Parameters: Element?.params,
            Route: Element.route.path,
            Methods: Element.route.methods
        };
    });

    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

Context.get("/username/search", async (request, response) => {
    const $ = await Username.Search("Administrator");
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

Context.get("/username/available", async (request, response) => {
    const $ = await Username.Available("Administrator");
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.originalUrl + ")", Response);

    response.send(Response);
});

export default Context;
