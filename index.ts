/***
 * @copyright
 */

import Module from "module";

import { Process } from "@cloud/environment";

const Require = Module.createRequire(import.meta.url);

Reflect.set(Process, "package", Require("./package.json"));

export default await import("./src").then(($) => $.Server());

await import("./src/server");