/***
 * @name        cli-prompt
 * @package     @cloud-vault
 * @summary     ESM-based CLI Prompt
 *
 * @author      Jacob B. Sanders
 * @license     BSD 3-Clause License
 * @copyright   Cloud-Technology LLC. & Affiliates
 */

import Process from "process";
import Input from "readline";
import Utility from "util";

/**
 * Asynchronous CLI Prompt
 *
 * @param query
 *
 * @returns {Promise<string>}
 *
 * @constructor
 *
 * @example
 * import { Prompt } from ...;
 *
 * const Awaitable = async (title: string) => {
 *     const Input = async () => await Prompt( title + ":" + " " );
 *
 *     let $: string = await Input().then( (output) => output );
 *     while ( $.trim().length === 0 ) $ = await Input().then( ($) => $ );
 *     return $.trim();
 * };
 *
 */

const Prompt = (query) => {
    const Data = new Promise(async (resolve, reject) => {
        let $ = "";

        const Interface = Input.createInterface({
            input: Process.openStdin(), output: Process.stdout
        });

        Interface.on("SIGINT", () => {
            Process.stdout.clearLine();
            Interface.question("N/A", ($) => {
                if ($.match(/^y(es)?$/i)) Interface.pause();
            });
        });

        const prompt = Utility.promisify(Interface.question).bind(Interface);

        try {
            $ = await prompt(query);
        } catch ( _ ) {
            reject(_);
        } finally {
            Interface.close();
        }

        resolve($);
    });

    // ...

    return Data;
};

export { Prompt };

export default Prompt;

