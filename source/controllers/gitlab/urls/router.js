import { Controller } from "./controller.js";

import { Normalize } from "./../../../utilities/configuration.js";

import { Module } from "./api.js";

Controller.get("/", async (request, response) => {
    const Query = await Module.All();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/base", async (request, response) => {
    const Query = await Module.Base();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/login", async (request, response) => {
    const Query = await Module.Login();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/all", async (request, response) => {
    const Query = await Module.All();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/projects", async (request, response) => {
    const Query = await Module.Projects();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/groups", async (request, response) => {
    const Query = await Module.Groups();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

Controller.get("/users", async (request, response) => {
    const Query = await Module.Users();
    const $ = Normalize(request, response, Query);
    const Body = $.toJSON();

    response.send(Body);
});

export default Controller;
