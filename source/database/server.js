// import * as Library from "./../library/index.js";

import Library from "@cloud-technology/library";

const $ = process.env["Mongo"];

const URI = $["Protocol"] + "://" + $["Host"];

export const Connection = async () => {
    console.debug("[Database]", "[Debug]", "Attempting to Establish Database Connection ...");

    try {
        await Library.ORM.connect(URI, {
            user: process.env["Mongo"]["Username"],
            pass: process.env["Mongo"]["Password"],
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "Authorization",
            maxPoolSize: 10,
            keepAlive: true,
            autoIndex: true,
            appName: process.env["Server"] || "Nexus-API",
            forceServerObjectId: false,
            loggerLevel: (
                (process.env["NODE_ENV"] !== "production")
                && (process.env["Environment"] !== "production")
            ) ? "DEBUG" : "WARN"
        });

        console.debug("[Database]", "[Debug]", "A Database Connection has been Established");
    } catch ( error ) {

        console.trace("[Database]", "[Error]", "Fatal Error While Establishing Connection to Database", "\n", error);
        console.error("[Database]", "[Error]", "Exiting ...");

        /*** {@link https://github.com/cloud-hybrid/delta/tree/Development/packages/api#error-codes Error-Code(s)} */

        process.exit(172);
    }
};

export default Connection;
