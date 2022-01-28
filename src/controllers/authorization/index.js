/***
 * @module Authorization
 *
 * Authorization Controller (Router)
 *
 * Authorization via GET HTTP(s) Requests
 *      In order to successfully validate a request as valid, the client
 *      must include an "Authorization" header with the request using the following
 *      convention:
 *
 *      > Authorization: Bearer X.Y.Z
 *
 *      The controller will then interface validation logic that:
 *      1. Transforms the header into an object
 *      2. Look-up User-ID from object attributes
 *      3. Search database for User-ID
 *      4. Validate Session is valid
 *
 */

// import * as Library from "./../../library/index.js";
import Library from "@cloud-technology/library";

/// --> Controller(s)
import { default as Token } from "./token/index.js";
import { default as Login } from "./login/index.js";
import { default as Test } from "./synchronous-unit-testing/index.js";

/// --> Base Controller
const Controller = Library.Router();

/// --> Route(s)
Controller.use("/", Token);
Controller.use("/login", Login);
Controller.use("/token", Token);
Controller.use("/test", Test);

export default Controller;