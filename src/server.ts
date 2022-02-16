import FS      from "fs";
import Path    from "path";
import Process from "process";
import HTTPs   from "https";

import { Application, Controller, Middleware } from ".";

/// import { Initializer as Error } from "./src/utilities/error.js";

const CWD = Process.cwd();

await Middleware( Application );

Process.env = { ... JSON.parse(String(FS.readFileSync(Path.join(CWD, ".env")))), ... Process.env };

/*** @type {{PFX: Buffer, Key: Buffer, Certificate: Buffer}} */
const Content = {
    Key: FS.readFileSync( Path.join( CWD, Process.env["TLS"]["Key"] ) ),
    PFX: FS.readFileSync( Path.join( CWD, Process.env["TLS"]["PFX"] ) ),
    Certificate: FS.readFileSync(
        Path.join( CWD, Process.env["TLS"]["Certificate"] )
    )
};

/*** @type {{pfx: Buffer, passphrase: *, cert: Buffer, key: Buffer}} */
const options = {
    passphrase: Process.env["TLS"]["Passphrase"],

    key: Content.Key,
    pfx: Content.PFX,
    cert: Content.Certificate
};

Application.use( "/", Controller );

HTTPs.createServer(options, Application).listen(Process.env["Port"] ?? 3443);