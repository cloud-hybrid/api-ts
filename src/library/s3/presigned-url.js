import fs from "fs";
import http from "http";
import https from "https";

import URI from "url";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Client from "./client.js";

const Service = await new Client().instantiate();

class Payload {
    /*** @type {Client} */
    client = Service;

    /*** @type {import("@aws-sdk/types").StringSigner | string} */
    url = null;

    /*** @type {number} */
    expiration = 900;

    /*** @type {{headers?: OutgoingHttpHeaders | undefined, setHost?: boolean | undefined, lookup?: LookupFunction | undefined, agent: boolean, socketPath?: string | undefined, method: string, auth?: string | null | undefined, createConnection?: ((options: ClientRequestArgs, oncreate: (err: Error, socket: Socket) => void) => Socket) | undefined, timeout?: number | undefined, maxHeaderSize?: number | undefined, defaultPort?: number | string | undefined, rejectUnauthorized: boolean, path: string | null | undefined, protocol?: string | null | undefined, hostname?: string | null | undefined, _defaultAgent?: Agent | undefined, port, localAddress?: string | undefined, requestCert: boolean, host, family?: number | undefined, signal?: AbortSignal | undefined}} */
    settings = null;

    /***
     *
     * @param expiration {number}
     *
     */

    constructor(expiration = 900) {
        this.expiration = expiration;
    }

    /***
     *
     * @param $ {PathLike | string}
     *
     * @returns {WriteStream}
     *
     */

    static stream = ($) => fs.createWriteStream($);

    /***
     *
     * @param command {import("@aws-sdk/types").Command}
     *
     * @param expiration {number} Expiration Delta (Units are in milliseconds)
     *
     * @returns {Promise<import("@aws-sdk/types").StringSigner>}
     *
     */

    async generate(command) {
        this.url = await getSignedUrl(this.client, command, {
            expiresIn: this.expiration
        });

        this.settings = this.configuration();
    }

    /***
     * HTTPs Query Configuration Object
     * --------------------------------
     * @return {{headers?: OutgoingHttpHeaders | undefined, setHost?: boolean | undefined, lookup?: LookupFunction | undefined, agent: boolean, socketPath?: string | undefined, method: string, auth?: string | null | undefined, createConnection?: ((options: ClientRequestArgs, oncreate: (err: Error, socket: Socket) => void) => Socket) | undefined, timeout?: number | undefined, maxHeaderSize?: number | undefined, defaultPort?: number | string | undefined, rejectUnauthorized: boolean, path: string | null | undefined, protocol?: string | null | undefined, hostname?: string | null | undefined, _defaultAgent?: Agent | undefined, port, localAddress?: string | undefined, requestCert: boolean, host, family?: number | undefined, signal?: AbortSignal | undefined}}
     *
     * @constructor
     *
     */

    configuration = () => {
        const $ = new URI.URL(this.url);

        $.rejectUnauthorized = false;

        return $;
    };

    /***
     *
     * @param local {string} Local File-System Path
     * @param progress {boolean}
     *
     * @returns {Promise<void>}
     *
     */

    async download(local, progress = true) {
        const method = "GET";

        const protocol = !this.url.charAt(4)
            .localeCompare("s") ? https : http;
        const file = Payload.stream(local);
        const data = {response: null, request: null, total: 0};

        const $ = new Promise((resolve, reject) => {
            const request = protocol.get(this.settings, response => {
                if ( response.statusCode !== 200 ) {
                    reject(new Error(JSON.stringify({
                        error: true,
                        settings: this.settings,
                        status: response.statusMessage,
                        code: response.statusCode
                    }, null, 4)));

                    return;
                }

                data.request = this.settings;

                data.response = {
                    method: method,
                    headers: response.headers,
                    http: response.httpVersion,
                    status: {
                        code: response.statusCode,
                        message: response.statusMessage
                    }
                };

                response.pipe(file);
            });

            file.on("finish", () => {
                resolve(data);
            });

            request.on("error", (error) => {
                fs.unlink(local, () => reject(error));
            });

            request.on("response", ($) => {
                data.total = Number.parseInt($.headers["content-length"], 10);
            });

            file.on("error", (error) => {
                fs.unlink(local, () => reject(error));
            });

            request.end();
        });

        return data;
    }
}

export { Payload };

export default Payload;

const Test = new Payload().i