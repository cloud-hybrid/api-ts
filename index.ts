/***
 * @copyright
 */

import Module from "module";

import { Process } from "@cloud/environment";

const Import = Module.createRequire(import.meta.url);

Reflect.set(Process, "package", Import("./package.json"));

await import("./src/server");
