/*** JWT Token API
 *
 * @module API
 *
 * @typedef {import("jsonwebtoken").GetPublicKeyOrSecret} Private
 * @typedef {import("jsonwebtoken").VerifyOptions} Options
 * @typedef {import("jsonwebtoken").VerifyCallback} Callback
 *
 * @typedef {import("jsonwebtoken").JwtPayload} Payload
 *
 */

import Utility from "util";

import { Token } from "./../../../library/index.js";

const Secret = await import("./../../../library/secret.js").then((Module) => Module.Secret);

/*** Asynchronous Promise Wrapper
 * @type {(token: string, secretOrPublicKey: Private, options?: Options, callback?: Callback) => Promise<(err: any, signingKey?: Secret) => void>}
 */

const Verify = Utility.promisify(Token.verify);

/***
 *
 * @param verification {Boolean}
 * @param data {String|Payload}
 * @param token {String}
 * @param error {Boolean}
 * @param type {null | "Expiration" | "Malformation" | "Issuer"}
 *
 * @return {{Serialization, Type: null, Error, Verification, Token: {JWT}}}
 *
 * @constructor
 *
 */

const Schema = (verification, data, token, error) => {
    return {
        Verification: verification,
        Serialization: data,
        Token: {JWT: token},
        Error: error
    };

    /// return {
    ///     ID: data.id,
    ///     Verification: verification,
    ///     Token: {JWT: token},
    ///     Error: error,
    ///     Type: type
    /// };
};

/***
 * @param token
 *
 * @returns {Promise<{Serialization, Type: null, Error, Verification, Token: {JWT}} | Error>}
 *
 * @constructor
 *
 */

export const Validate = async (token) => {
    const JWT = token;

    /// Fatal Error - Catch @Controller Level
    if ( !JWT ) throw new Error("NIL");

    console.debug("[Authorization (Token - API)]", "[Debug]", "JWT-Token" + ":", JWT);
    try {
        await Verify(JWT, Secret);

        return Schema(true, Token.decode(JWT, Secret), JWT, false, null);
    } catch ( e ) {
        const $ = JSON.stringify(e, null, 4);

        console.debug("[Authorization (Token - API)]", "[Error]", "Verification" + ":", $);

        /// --> Catch Expiration Error
        if ( e.name === "TokenExpiredError" ) {
            return Schema(false, "JWT Token Expiration", null, "Expiration");
        } else if ( e.name === "JsonWebTokenError" ) {
            return Schema(false, "JWT Token Malformation", null, "Invalid");
        } else {
            throw new Error(JSON.stringify(e, null, 4));
        }
    }
};
