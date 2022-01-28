/*** Body-Parser
 * @module Body
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

import Library from "@cloud-technology/library";

const Parsers = {
    "URL-Encoded": {
        Module: Library.Parser.urlencoded,
        Parameters: {
            extended: true,
            parameterLimit: 1000
        }
    }, JSON: {
        Module: Library.Parser.json,
        Parameters: {
            strict: true
        }
    }
};

/*** Body Middleware Loader
 *
 * @param server {Application}
 *
 * @param parsers {Parsers}
 *
 * @return {Application}
 *
 * @constructor
 *
 */

export const Body = (server, parsers = Parsers) => {
    console.debug("[Body-Parser] [Debug] Initializing Body Parser(s)");

    Object.keys(parsers).forEach((Parser) => {
        console.debug("[Body-Parser] [Debug] Instantiating" + " " + Parser + " " + "Parser");

        const Function = parsers[Parser].Module;
        const Parameters = parsers[Parser].Parameters;

        console.debug("[Body-Parser] [Debug] Parameters" + ":", Parameters);

        server.use(Function(Parameters));

        console.debug("[Body-Parser] [Debug] Updated Application Request + Response Parser(s)");
    });

    return server;
};

export default Body;