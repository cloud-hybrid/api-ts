import { Application } from "./../index.js";

export const initialize = async () => {
    console.debug("[Middleware] [Debug] Initializing Middleware ...");

    const Promises = Promise.allSettled((
        [
            import("./Compression.js").then((Module) => Module.Compression(Application)),
            import("./Logging.js").then((Module) => Module.Logging(Application)),
            import("./Headers.js").then((Module) => Module.Headers(Application)),
            import("./IPv4.js").then((Module) => Module.IP()),
            import("./Body.js").then((Module) => Module.Body(Application)),
            import("./CORS.js").then((Module) => Module.CORS(Application)),
            /// import("./HTTPs.js").then((Module) => Module.HTTPs(Application)),
            import("./TLS.js")
        ]
    ));

    Promises.finally(() => console.debug("[Middleware] [Debug] API Middleware Successfully Loaded"));

    return Promises;
};

export default async () => await initialize();