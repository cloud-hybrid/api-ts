/*** Compression
 * @module Compression
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

import { Server } from "..";
import { Compression } from "@cloud/library";

type Generic = any;
type Server = typeof Server;

/*** Compression Middleware Loader
 *
 * @param server {Application}
 *
 * @returns {Application}
 *
 * @constructor
 *
 */

export const Compress = (server: Server | Generic) => {
    console.debug("[Compression] [Debug] Setting Compression Configuration(s)");
    server.use(Compression());
    console.debug("[Compression] [Debug] Compression has been Enabled");

    return server;
};