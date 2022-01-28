// import * as Library from "./../library/index.js";

import Library from "@cloud-technology/library";

export const Cryptography = Library.Cryptography;

Library.ORM.set("autoIndex", false);

await import("./server.js").then(async (Module) => await Module.Connection());

export const ORM = Library.ORM;
export const {Schema, Types} = ORM;

export default ORM;

