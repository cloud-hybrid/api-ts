import { Controller } from "./controller.js";

import { Normalize } from "./../../../utilities/configuration.js";

import { default as Schemas } from "./schema.js";

import { Authenticate } from "./../../../authorization/index.js";

import { Module } from "./api.js";

/// Controller.get("/", Authenticate, async (request, response) => {
///     const $ = await Module.Projects();
///     const Query = Normalize(request, response, $);
///     const Response = Query.toJSON();
///
///     response.send(Response);
/// });

Controller.get("/", async (request, response) => {
    const $ = await Module.Projects();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    response.send(Response);
});

Controller.get("/total", async (request, response) => {
    const $ = await Module.Total();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/pages", async (request, response) => {
    const $ = await Module.Pages();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/empty", async (request, response) => {
    const $ = await Module.Empties();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/empty/total", async (request, response) => {
    const $ = await Module.Empties();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/schema", async (request, response) => {
    const $ = await Schemas.Data();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/schema/request", async (request, response) => {
    const $ = await Schemas.Request();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/schema/official", async (request, response) => {
    const $ = Schemas.Official;
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

export default Controller;
