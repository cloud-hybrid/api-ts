import { Controller } from "./controller.js";

import { Normalize, Reject } from "./../../../utilities/configuration.js";

import { default as User } from "./../../../database/model/user/index.js";

import { Validate } from "./api.js";

//Controller.get("/", async (request, response) => {
//    console.warn("[Authorization (Login)]", "[Error]", "Invalid Request Method");
//    console.warn("[Authorization (Login)]", "[Debug]", "Request Headers" + ":", JSON.stringify(request.headers, null, 4));
//    console.warn("[Authorization (Login)]", "[Debug]", "Request Body" + ":", JSON.stringify(request.body, null, 4));
//
//    const Query = Normalize(request, response, {
//        Error: "Invalid Request Method"
//    });
//    const Response = Query.toJSON();
//
//    response.statusMessage = "Unauthorized";
//    response.statusCode = 401;
//
//    console.debug("[Authorization (Login)]", "[Error]", Response);
//
//    response.send(Response);
//});

Controller.all("/", async (request, response) => {
    console.debug("[Authorization (Login)]", "[Debug]", "Request" + " " + "-", request.originalUrl);
    const Username = request.body?.Username || request.body?.username || request.body?.user ||
        request.query?.Username || request.query?.username || request.query?.user ||
        request.header("Username") || request.header("username") || request.header("user") ||
        request.header("X-Username") || request.header("x-username") || request.header("x-user") ||
        null;

    const Password = request.body?.Password || request.body?.password ||
        request.query?.Password || request.query?.password ||
        request.header("Password") || request.header("password") ||
        request.header("X-Password") || request.header("x-password") ||
        null;

    const Grant = request.body?.Grant || request.body?.grant ||
        request.query?.Grant || request.query?.grant ||
        request.header("Grant") || request.header("grant") ||
        request.header("X-Grant") || request.header("x-grant") ||
        null;

    const Profile = await User.findOne({Username: Username});

    try {
        if ( Grant === null ) {
            const e = new Error("Grant (Type) Required as Input");
            e.name = "Grant-Requirement-Error";
            throw e;
        } else {
            if ( Grant !== "Password" && Grant !== "password" ) {
                const e = new Error("Invalid Grant Type");
                e.name = "Invalid-Grant-Type-Error";
                throw e;
            }
        }

        if ( Username === null ) {
            const e = new Error("Username Required as Input");
            e.name = "Username-Requirement-Error";
            throw e;
        }

        if ( Password === null ) {
            const e = new Error("Password Required as Input");
            e.name = "Password-Requirement-Error";
            throw e;
        }

        if ( Profile === null ) {
            const e = new Error("Profile with Username (" + Username + ") Does not Exist");
            e.name = "Profile-Not-Found-Error";
            throw e;
        }

        const $ = Validate(Profile, Password);

        const Query = Normalize(request, response, $);
        const Response = Query.toJSON();

        response.statusMessage = "Authorized";

        console.debug("[Authorization (Login)]", "[Debug]", $);

        response.send(Response);
    } catch ( e ) {
        const Response = {};

        console.error("[Authorization (Login)]", "[Error]", e);

        if ( e.name === "Grant-Requirement-Error" ) {
            const Query = Reject(request, response, {
                    Message: "Grant-Type is Required as Input",
                    Error: "Grant",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        } else if ( e.name === "Invalid-Grant-Type-Error" ) {
            const Query = Reject(request, response, {
                    Message: "Unknown or Malformed Grant Type",
                    Error: "Invalid-Grant-Type",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        } else if ( e.name === "Username-Requirement-Error" ) {
            const Query = Reject(request, response, {
                    Message: "Username is Required as Input",
                    Error: "Username",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        } else if ( e.name === "Password-Requirement-Error" ) {
            const Query = Reject(request, response, {
                    Message: "Password is Required as Input",
                    Error: "Password",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        } else if ( e.name === "Profile-Not-Found-Error" ) {
            const Query = Reject(request, response, {
                    Message: "Incorrect Username or Password",
                    Error: "Bad Authentication Attempt",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        } else {
            console.debug("[Authorization (Login)]", "[Error]", JSON.stringify({Query: {... Profile.toJSON(), ... {Password: "[Redacted]"}}}, null, 4));

            const Query = Reject(request, response, {
                    Message: "Incorrect Username or Password",
                    Error: "Bad Authentication Attempt",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

            Response.$ = Query.toJSON();
        }

        response.send(Response.$);
    }
});

export default Controller;
