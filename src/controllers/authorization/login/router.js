import { Controller } from "./controller.js";

import { Normalize, Reject } from "./../../../utilities/configuration.js";

import { Validate } from "./api.js";

const Log = ($) => console.log("[Debug][Authorization][Login]", $);
const Error = ($) => console.log("[Error][Authorization][Login]", $);

Controller.post("/", async (request, response) => {
    Log("Request" + " " + "-" + " " + request.originalUrl);

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

    Log("Username" + ":" + " " + Username);
    Log("Password" + ":" + " " + Password);

    if ( Grant === null ) {
        Error("Grant Inclusion Failure" + ":" + " " + Grant);
        console.debug("[Debug][Authorization][Login]", "Grant Inclusion Failure", Grant);
        const Query = Reject(request, response, {
                Message: "Grant-Type is Required as Input",
                Error: "Grant",
                Realm: "Nexus",
                Status: 401
            }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
            401, "Unauthorized"
        );

        response.send(Query.toJSON());
    } else if ( Grant !== "Password" && Grant !== "password" ) {
        Error("Grant Type Failure" + ":" + " " + Grant);
        const Query = Reject(request, response, {
                Message: "Unknown or Malformed Grant Type",
                Error: "Invalid-Grant-Type",
                Realm: "Nexus",
                Status: 401
            }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
            401, "Unauthorized"
        );

        response.send(Query.toJSON());
    } else if ( !Username ) {
        Error("Username Inclusion Failure" + ":" + " " + Grant);
        const Query = Reject(request, response, {
                Message: "Username is Required as Input",
                Error: "Username",
                Realm: "Nexus",
                Status: 401
            }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
            401, "Unauthorized"
        );

        response.send(Query.toJSON());
    } else if ( !Password ) {
        Error("Password Inclusion Failure" + ":" + " " + Grant);
        const Query = Reject(request, response, {
                Message: "Password is Required as Input",
                Error: "Password",
                Realm: "Nexus",
                Status: 401
            }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
            401, "Unauthorized"
        );
        response.send(Query.toJSON());
    } else {
        Log("Pre-Validation Successful");
        const $ = await Validate(Username, Password);

        const Query = ($) ? Normalize(request, response, $)
            : Reject(request, response, {
                    Message: "Incorrect Username or Password",
                    Error: "Bad Authentication Attempt",
                    Realm: "Nexus",
                    Status: 401
                }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
                401, "Unauthorized"
            );

        const Response = Query.toJSON();

        Log(Response);

        response.send(Response);
    }
});

Controller.get("/", async (request, response) => {
    Error("Invalid Request Method" + ":" + " "  + "GET");
    Error("Request Headers" + ":" + " " + JSON.stringify(request.headers, null, 4));
    Error("Request Body" + ":" + " " + JSON.stringify(request.body, null, 4));

    const Query = Reject(request, response, {
            Message: "Invalid Request Method",
            Error: "Bad Authentication Attempt",
            Realm: "Nexus",
            Status: 403
        }, {"WWW-Authenticate": "Realm Nexus-JWT-Validator"},
        403, "Unauthorized"
    );
    const Response = Query.toJSON();

    response.send(Response);
});

export default Controller;
