/*** CORS
 * @module CORS
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

import Library from "@cloud-technology/library";

/*** Default CORS Options
 * @type {{credentials: boolean, origin: string, optionsSuccessStatus: number, preflightContinue: boolean}}
 */

export const Options = {
    origin: "*",
    credentials: false,
    optionsSuccessStatus: 200,
    preflightContinue: true
};

/*** CORS Middleware Loader
 *
 * @param server {Application}
 *
 * @param options {Options}
 *
 * @return {Application}
 *
 * @constructor
 *
 */

export const CORS = (server, options = Options) => {
    console.debug("[CORS] [Debug] Setting CORS Policy");

    /***
     * @type {((req: e.CorsRequest, res: {statusCode?: number | undefined, setHeader(key: string, value: string): any, end(): any}, next: (err?: any) => any) => void) | *}
     */

    const Middleware = Library.CORS(Options);

    console.debug("[CORS] [Debug] Updated CORS Settings");

    server.use(Middleware);

    console.debug("[CORS] [Debug] CORS has been Updated & Enabled");

    return server;
};

export default CORS;