/***
 * @module Logging
 */

import { Application } from "..";
import { Logger } from "library/logger";

type Generic = any;
type Server = typeof Application;

const Logging = (server: Server | Generic) => {
    console.debug("[Logging] [Debug] Instantiating HTTP Logger");

    server.use(Logger);

    console.log(server);

    console.debug("[Logging] [Debug] Enabled Custom HTTP Logging");
};

export default Logging;

export { Logging };