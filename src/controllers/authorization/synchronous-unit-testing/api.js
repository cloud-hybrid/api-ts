/*** Login API
 *
 * @module API
 *
 * @typedef {import("./../../../database/index.js").ORM} ORM
 * @typedef {import("./../../../database/model/user/index.js").Instance} Instance
 * @typedef {import("./../../../library/index.js").Token} Signature
 */

import Process from "process";
import TTY from "tty";
import { Token, Cryptography } from "./../../../library/index.js";

const Secret = await import("./../../../library/secret.js").then((Module) => Module.Secret);

/***
 *
 * @param User {Instance}
 * @param password
 *
 * @returns {Promise<null|boolean|{User: {Role: *, Email: *, Username: *, ID: *, Name: *}, JWT: Signature}>}
 *
 * @constructor
 */

const Validate = (User, password) => {
    /***
     * @type {Instance}
     */

    /// Fatal Error - Catch @Controller Level
    if ( !User ) throw new Error("NIL");

    return new Promise((resolve, reject) => {
        const Data = User.findOne({Username: username}).then((Record) => {
            Record.validatePassword(password, (match) => {
                if ( !match ) {
                    const e = new Error("Incorrect Password Match");
                    e.name = "Password-Validation-Error";
                    reject(e);
                } else {
                    const Fields = {
                        subject: "Nexus",
                        audience: "Audience",
                        issuer: "Issuer",
                        expiresIn: "1d",
                        header: {
                            ID: Record.id
                        }
                    };

                    resolve({
                        ID: Record.id,
                        JWT: Token.sign({id: Record.id}, Secret, Fields)
                    });
                }
            }, (percent) => {
                (TTY.isatty(Process.stdout.fd)) && console.log(percent);
            });
        }) ?? false;

        return (Data !== false) ? Data : null;
    });
};

export { Validate };

export default Validate;