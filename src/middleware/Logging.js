/*** Logging
 * @module Logging
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

import { Logger } from "@cloud-technology/library";

/***
 *
 * @param server {Application}
 *
 * @constructor
 *
 */

export const Logging = (server) => {
    console.debug("[Logging] [Debug] Instantiating HTTP Logger");

    Logger.Handler(server);

    console.debug("[Logging] [Debug] Enabled Custom HTTP Logging");
};

export default Logging;