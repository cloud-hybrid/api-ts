/***
 *
 * @returns {boolean}
 *
 * @constructor
 *
 */

export const Runtime = () => {
    if ( process.env["PWD"] !== process.env.npm_config_local_prefix ) {
        console.error("[Error] Invalid Start Command");
        console.error("    >>> $ npm run start");

        process.exit(128);
    } else {
        return true;
    }
};