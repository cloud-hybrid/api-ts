/***
 * @module Logging
 */

import { Server } from "..";
import { Logger } from "@cloud/logging";

type Generic = any;
type Server = typeof Server;

const Logging = (server: Server | Generic) => {
    console.debug("[Logging] [Debug] Instantiating HTTP Logger");

    server.use(Logger);

    console.debug("[Logging] [Debug] Enabled Custom HTTP Logging");
};

export default Logging;

export { Logging };