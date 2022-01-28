import * as Assertion from "assert";

import { Any } from "./generic.js";

/***
 * Property Filter Function
 *
 * @param Type {any}
 *
 * @return {Any}
 *
 * @constructor
 *
 */

const Properties = (Type) => Object.keys(Type).filter(($) => typeof Types[$] !== "function");

/***
 * Property Check Validator
 *
 * @param Type {any}
 * @param property {String}
 *
 * @return {true|false}
 *
 * @constructor
 *
 */

const Validate = (Type, property) => ([null, undefined, NaN].indexOf(Types[property]) === -1);

/***
 * Custom Error Type Validation(s)
 */

const Types = {
    Error: Any,
    Warning: Any,
    Type: Any,
    Null: Any,

    attributes: () => Properties(Types),
    validate: (type) => Validate(Types, type)
};

const Data = (message, name, status = "Error", prefix = null, exit = false) => {
    const Type = {
        message, name, status, prefix, exit, throw: () => {
            const $ = new Error(Type.message);
            $.name = Type.name;

            return $;
        }
    };

    return Type;
};

/***
 *
 * @param message {String}
 * @param type {Types.attributes}
 * @param Name
 * @constructor
 */

const Initializer = (message, type = Types.attributes(), Name) => {
    Types.validate(type);

    return Data(message, type);
};

export { Initializer };