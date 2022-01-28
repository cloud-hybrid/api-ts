/***
 *  HTTPs Redirect
 * ---------------
 *
 * @module HTTPs
 *
 * @typedef {import("./../index.js").Application} Application
 *
 */

/***
 *
 * @param server {Application}
 *
 * @constructor
 *
 */

export const HTTPs = (server) => {
    console.debug("[HTTPs] [Debug] Instantiating HTTPs Check");
    const $ = (request, response) => {
        return server.redirect("https://" + request.headers.host + request.url);

        /// if (request.get("X-Forwarded-Proto")?.indexOf("https") === -1) {
        ///     return request.redirect("https://" + request.headers.host + request.url);
        /// }

        // callback();
    };

    console.debug("[HTTPs] [Debug] Setting HTTPs Override");

    server.use($);

    console.debug("[HTTPs] [Debug] Enabled HTTPs Redirects");
};

export default HTTPs;
