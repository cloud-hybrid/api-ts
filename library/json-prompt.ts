/***
 * Usage Example
 *
 * @example
 * await import("@cloud/library/json-prompt");
 *
 * @example
 * const Configuration = await import("@cloud/library/json-prompt");
 * const environment = Configuration.environment;
 * console.log(Configuration, environment);
 *
 */

import FS from "fs";

import Process from "process";
import Input from "readline";
import Utility from "util";

type Generic = any;

const Awaitable = (query: string, buffer: [string?]) => {
    return new Promise(async (resolve, reject) => {
        let $: string | Generic = "";

        const Interface = Input.createInterface({
            input: Process.openStdin(), output: Process.stdout
        });

        Interface.on("line", (line) => {
            buffer.push(line);
        });

        Interface.on("SIGINT", () => {
            buffer.push("EOF");

            resolve(buffer);
        });

        try {
            $ = await Utility.promisify(Interface.question).bind(Interface)(query);
        } catch ( error ) {
            reject(error);
        } finally {
            Interface.close();
        }

        resolve($);
    });
};

const File = async (title: string) => {
    const buffer: [string?] | Generic = [];
    const Input = async () => await Awaitable(title + ":" + " ", buffer);

    buffer.unshift(await Input().then((output) => output));

    ( buffer.length > 0 && buffer[ 0 ] !== "" ) && Process.stdout.write("\n");
    ( buffer.length > 0 && buffer[ 0 ] !== "" ) && Process.stdout.write(
        buffer.map(($: string) => {
            return "    >>> " + $ + "\n";
        }).join("") + "\n"
    );

    return [ buffer.join("\n"), buffer.join("") ];
};

const Prompt = async () => {
    return await File("Configuration");
};

Process.stdout.write("Please Provide Configuration File" + ":" + " ");
const $ = await Prompt();
const Parse = (debug = false) => {
    try {
        return JSON.parse($[ 0 ]);
    } catch ( error ) {
        if ( FS.existsSync($[ 1 ]) ) {
            try {
                const target = FS.readFileSync($[ 1 ]);

                ( debug ) && Process.stdout.write(
                    String(target).trim().split("\n").map(($) => {
                        return "    >>> " + $ + "\n";
                    }).join("") + "\n"
                );

                return JSON.parse(String(target));
            } catch ( error ) { /// Likely, a Directory or Socket
                Process.stderr.write("Target File Descriptor isn't JSON Serializable" + "\n");
            }
        } else {
            if ( $[ 1 ] === "" ) {
                process.stdout.write("\n");
                process.stdout.write("   >>> Cancelled" + "\n");
                process.stdout.write("\n");
            } else {
                Process.stderr.write("Unable to Parse System Path or Standard-Input (0) Buffer" + "\n");
            }
        }
    }
};

export default Parse(true);
