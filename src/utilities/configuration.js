/***
 * Response Configuration Middleware
 * ---------------------------------
 *
 * @module Configuration
 *
 */

/***
 *
 * @param request {Request}
 * @param body {Object|null}
 * @param headers
 * @returns {{Response: {"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}, toJSON: (function(): string), Configuration: {"Keep-Alive": boolean, Status: number, Type: string, Message: string}, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
 * @constructor
 *
 */

export const Generator = (request, body = null, headers = null) => {
    /***
     *
     * @type {{Headers, URL: {Origin: *, Normalized, Base: *}}}
     *
     */

    const Request = {
        Headers: (headers === null) ? request.headers : { ... request.headers, ... headers },
        URL: {
            Base: request.baseUrl,
            Origin: request.originalUrl,
            Normalized: request.url
        }
    };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string}}
     *
     */

    const Configuration = {
        "Keep-Alive": false,
        Status: 200,
        Message: "Online",
        Type: "Application/JSON"
    };

    /***
     *
     * @type {{Status: string}}
     *
     */

    const Body = (
        body !== null
    )
        ? { ... body }
        : { Status: "Online" };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
     *
     */

    const Response = {
        ... Configuration,
        Request: Request,
        Body: Body
    };

    return { Request, Response, Configuration, Body, toJSON: () => JSON.stringify(Response, null, 4) };
};

/***
 *
 * @param request {Request}
 * @param response {ResponseType}
 * @param body {Object|null}
 * @param headers
 * @returns {{Response: {"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}, toJSON: (function(): string), Configuration: {"Keep-Alive": boolean, Status: number, Type: string, Message: string}, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
 * @constructor
 *
 */

export const Normalize = (request, response, body = null, headers = null) => {
    /***
     *
     * @type {{Headers, URL: {Origin: *, Normalized, Base: *}}}
     *
     */

    const Request = {
        Headers: (headers === null) ? request.headers : { ... request.headers, ... headers },
        URL: {
            Base: request.baseUrl,
            Origin: request.originalUrl,
            Normalized: request.url
        }
    };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string}}
     *
     */

    const Configuration = {
        "Keep-Alive": false,
        Status: 200,
        Message: "Online",
        Type: "Application/JSON"
    };

    /***
     *
     * @type {{Status: string}}
     *
     */

    const Body = (
        body !== null
    )
        ? { ... body }
        : { Status: "Online" };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
     *
     */

    const Response = {
        ... Configuration,
        Request: Request,
        Body: Body
    };

    /// HTTP(s) Response
    response.type(Configuration.Type);
    response.status(Configuration.Status);
    response.contentType(Configuration.Type);
    response.statusMessage = Configuration.Message;

    response.shouldKeepAlive = Configuration["Keep-Alive"];

    return { Request, Response, Configuration, Body, toJSON: () => JSON.stringify(Response["Body"], null, 4) };
};

/***
 *
 * @param request {Request}
 * @param response {ResponseType}
 * @param body {Object|null}
 * @param headers {{}|null}
 * @param status {Number|null}
 * @param error {String|null}
 *
 * @returns {{Response: {"Keep-Alive": boolean, Status: (*|Number|number), Type: string, Message: (*|String|string), Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: (Object|string)}, toJSON: (function(): string), Configuration: {"Keep-Alive": boolean, Status: (*|Number|number), Type: string, Message: (*|String|string)}, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: (Object|string)}}
 *
 * @constructor
 *
 */

export const Reject = (request, response, body = null, headers, status, error) => {
    const Body = body || "";

    /***
     *
     * @type {{Headers, URL: {Origin: *, Normalized, Base: *}}}
     *
     */

    const Request = {
        Headers: request.headers || null,
        URL: {
            Base: request.baseUrl,
            Origin: request.originalUrl,
            Normalized: request.url
        }
    };

    /***
     * @type {{"Keep-Alive": boolean, Status: (*|Number|number), Type: string, Message: (*|String|string)}}
     */

    const Configuration = {
        "Keep-Alive": false,
        Status: status || Body?.Status || 500,
        Message: error || Body?.Error || "Server Error",
        Type: "Application/JSON"
    };

    const Response = {
        ... Configuration,
        Request: Request,
        Body: Body
    };

    const Keys = Object.keys(headers);

    for (let header in Keys) {
        const $ = Keys[header];
        response.setHeader($, headers[$]);
    }

    /// HTTP(s) Response
    response.type(Configuration.Type);
    response.status(Configuration.Status);
    response.contentType(Configuration.Type);
    response.statusMessage = Configuration.Message;

    response.shouldKeepAlive = Configuration["Keep-Alive"];

    return { Request, Response, Configuration, Body, toJSON: () => JSON.stringify(Response["Body"], null, 4) };
};