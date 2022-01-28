import * as SDK from "@aws-sdk/client-s3";

import { Payload } from "./presigned-url.js";

/***
 *  AWS S3 File Interface
 *
 *  @alias Object => S3 (Object)
 *
 *  @example
 *  const Test = new File();
 *  await Test.get({
 *      Bucket: "aws-s3-example-bucket-name",
 *      Key: "example-file.zip"
 *  });
 *
 */

class File extends Payload {
    /***
     *
     * @param expiration {number}
     *
     */

    constructor(expiration = 300) {
        super(expiration);
    }

    /***
     * GET an AWS S3 Object via Pre-Signed URL
     *
     * @returns {Promise<void>}
     *
     * @param settings { SDK.GetObjectCommandInput }
     * @param local {PathLike | string}
     *
     * @param debug {boolean}
     */

    async get(settings, local = null, debug = false) {
        const command = new SDK.GetObjectCommand(settings);

        await this.generate(command);

        const descriptor = this.download(local ?? settings["Key"]);

        (debug) && console.debug("[Debug] Response", descriptor);

        return descriptor;
    }

    /***
     * PUT an AWS S3 Object via Pre-Signed URL
     *
     * @returns {Promise<void>}
     *
     * @param settings { SDK.PutObjectCommandInput }
     * @param remote {PathLike | string}
     *
     * @param debug {boolean}
     *
     */

    async put(settings, remote = null, debug = false) {
        const command = new SDK.PutObjectCommand(settings);

        await this.generate(command);

        const descriptor = this.download(remote ?? settings["Key"]);

        (debug) && console.debug("[Debug] Response", descriptor);

        return descriptor;
    }
}

export { File };

export default File;
