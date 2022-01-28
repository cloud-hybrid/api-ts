// Rainbow Table Brute-Force Attacks https://en.wikipedia.org/wiki/Rainbow_table
// Blowfish Cryptography https://en.wikipedia.org/wiki/Blowfish_(cipher)
// Cryptographic Salting https://en.wikipedia.org/wiki/Salt_(cryptography)

// ORM Middleware https://mongoosejs.com/docs/middleware.html

import { Cryptography } from "./../../index.js";

/***
 *
 * @param Schema
 * @returns {Promise}
 * @constructor
 */
export const Middleware = (Schema) => {
    console.debug("[Validation]", "[Debug]", "Instantiating Cryptographic Validation Function ...");

    /***
     * @param password {String}
     * @param callback {Function}
     * @param progress {Function}
     * @returns {Promise<Boolean, Error|null>}
     */
    Schema.methods.validatePassword = function (password, callback, progress) {
        const $ = this;

        console.debug("[Validation]", "[Debug]", "Evaluating Comparator ...");

        Cryptography.compare(password, $.Password, function (error, success) {
            if ( error ) throw new Error(error);

            if ( success === false ) {
                callback(false, "Failed Password Validation Attempt");
            } else {
                console.debug("[Validation]", "[Log]", "Password has been Successfully Validated");
                callback(true, "Successful");
            }
        }, function (percent) {
            progress(percent);
        });
    };

    console.debug("[Validation]", "[Debug]", "Validation Successfully Instantiated");
};

export default Middleware;