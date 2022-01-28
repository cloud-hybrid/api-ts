/*** Compression
 * @module Compression
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

import Library from "@cloud-technology/library";

/*** Compression Middleware Loader
 *
 * @param server {Application}
 *
 * @returns {Application}
 *
 * @constructor
 *
 */

export const Compression = (server) => {
    console.debug("[Compression] [Debug] Setting Compression Configuration(s)");
    server.use(Library.Compression());
    console.debug("[Compression] [Debug] Compression has been Enabled");

    return server;
};