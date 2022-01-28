/*** Login API
 *
 * @module API
 *
 * @typedef {import("./../../../database/index.js").ORM} ORM
 * @typedef {import("./../../../database/model/user/index.js").Instance} Instance
 * @typedef {import("./../../../library/index.js").Token} Signature
 */

import * as UUID from "uuid";
import Cryptography from "bcryptjs";

import { default as User } from "./../../../database/model/user/index.js";
import { Token } from "./../../../library/index.js";

const Secret = await import("./../../../library/secret.js").then((Module) => Module.Secret);

/***
 * JWT Login Verification
 * ----------------------
 * @param username {string}
 * @param password {string}
 *
 * @returns {Promise<{JWT: string, ID: string} | null>}
 *
 * @constructor
 *
 */

const Validate = async (username, password) => {
    /***
     * @type {Instance}
     */

    if ( !password || !username ) return null;

    const Record = await User.findOne({Username: username}) ?? null;
    const Verification = (Record) ? await Cryptography.compare(password, Record.Password) : false;

    if ( !Verification ) return null;

    /*** @type import("uuid").v4 */
    const UID = UUID.v4();

    /*** Token Signature Options
     * @type import("jsonwebtoken").SignOptions
     */
    const Fields = {
        subject: "Nexus",
        audience: "Audience",
        issuer: "Cloud-Technology",
        expiresIn: "1d",
        algorithm: "HS256",
        header: {
            ID: Record.id
        }
    };

    return {
        ID: Record.id,
        JWT: Token.sign({id: Record.id, uid: UID}, Secret, Fields)
    };
};

export { Validate };

export default Validate;