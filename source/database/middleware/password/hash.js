// Rainbow Table Brute-Force Attacks https://en.wikipedia.org/wiki/Rainbow_table
// Blowfish Cryptography https://en.wikipedia.org/wiki/Blowfish_(cipher)
// Cryptographic Salting https://en.wikipedia.org/wiki/Salt_(cryptography)

// ORM Middleware https://mongoosejs.com/docs/middleware.html

import { Cryptography } from "./../../index.js";

const SALT_TUMBLE_FACTOR = 15;

/***
 * @param Schema {import("mongoose").Schema}
 * @constructor
 */

const Middleware = (Schema) => Schema.pre("save", function (next) {
    const $ = this;

    // Only Mutate if Password := NEW || MODIFIED
    if ( !$.isModified("Password") ) return next();

    console.debug("[Hashing]", "[Debug]", "Instantiating Salt Cryptography Function ...");

    // Salt Generation
    Cryptography.generateSalt(SALT_TUMBLE_FACTOR, function (error, salt) {
        if ( error ) return next(error);

        console.debug("[Hashing]", "[Debug]", "Instantiating Password Hashing Function ...");

        // Hash Password & Salt
        Cryptography.Hash($.password, salt, function (error, hash) {
            if ( error ) return next(error);
            $.password = hash; // Override Plaintext Password with Updated Hash

            console.debug("[Hashing]", "[Debug]", "Salt + Hash Successfully Established");

            next();
        });
    });
});

export default Middleware;
