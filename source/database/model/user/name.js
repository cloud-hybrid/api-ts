/*** User's Name Database Reference Document
 * @module name
 *
 * @typedef {import("./../../index.js").ORM} ORM
 * @typedef {import("./../../index.js").ORM.Model} Model
 */

import { ORM } from "./../../index.js";

/*** Document - Schema Properties
 *
 * @type {{Preferred: {default: null, trim: boolean, alias: string, type: StringConstructor, required: boolean}, Last: {default: null, trim: boolean, alias: string, type: StringConstructor, required: boolean}, User: {ref: string, type: ObjectId, required: boolean}, Alias: {default: null, trim: boolean, alias: string, type: StringConstructor, required: boolean}, First: {default: null, trim: boolean, alias: string, type: StringConstructor, required: boolean}, Middle: {default: null, trim: boolean, alias: string, type: StringConstructor, required: boolean}}}
 *
 */

export const Document = {
    User: {type: ORM.Schema.Types.ObjectId, ref: "User", required: true},

    First: {
        required: true,
        type: String,
        default: null,
        alias: "first",
        trim: true
    },
    Middle: {
        required: false,
        type: String,
        default: null,
        alias: "middle",
        trim: true
    },
    Last: {
        required: true,
        type: String,
        default: null,
        alias: "last",
        trim: true
    },

    Preferred: {
        required: false,
        type: String,
        default: null,
        alias: "preferred",
        trim: true
    },

    Alias: {
        required: false,
        type: String,
        default: null,
        alias: "alias",
        trim: true
    }
};

/*** Schema Type-Instance
 * @type {Schema<String, Document>}
 */

export const Schema = new ORM.Schema(Document);

/*** Schema Instance
 * @type {ORM.model<String, Schema, String, Boolean>}
 */

export default ORM.model("Name", Schema, "Name", false);