import Process from "process";
import Input from "readline";
import Utility from "util";

/// https://nodejs.org/api/readline.html#tty-keybindings

const $$$ = () => {};
const Handler = (callback) => {
    process.stdin.resume();

    callback = callback || $$$;

    process.on("clean", callback);

    /// --> Clean
    process.on("exit", function () {
        process.emit("clean");
    });

    /// CTRL+C Catch
    process.on("SIGINT", function () {
        process.stdout.clearLine();

        process.stdout.write("\n" + "Caught Keyboard Event" + "\n");

        console.log(" - Press Control-D to Exit");
    });

    // SIGKILL Catch
    process.on("SIGUSR1", process.exit.bind(process.emit("clean")));
    process.on("SIGUSR2", process.exit.bind(process.emit("clean")));

    /// Implicit Runtime Exception Handling
    process.on("uncaughtException", function (error) {
        console.error("[Error] Uncaught Exception ...");
        console.error(error.stack);
        process.exit(128);
    });
};

const Awaitable = (query) => {
    return new Promise(async (resolve, reject) => {
        let $ = "";

        const Interface = Input.createInterface({
            input: Process.openStdin(), output: Process.stdout
        });

        Interface.on("SIGINT", () => {
            Process.stdout.clearLine();
            Interface.question("N/A", ($) => {
                Interface.pause();
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
};

const Prompt = async (title) => {
    const buffer = [];

    const Input = async () => await Awaitable(title + ":" + " ");

    let $ = await Input().then((output) => output.trim());
    buffer.push($);
    while ( $ !== "EOF" ) {
        buffer.forEach(($) => {
            process.stdout.write(" >>> " + $ + "\n");
        })
        $ = await Input().then((output) => output.trim());

        if ($ === "EOF") {
            process.stdout.clearLine();
            break;
        }

        buffer.push($.trim());
    }

    return buffer;
};

const Repository = async () => {
    return await Prompt("Repository");
}

const $ = await Repository();

$.forEach(($) => {
    process.stdout.write(" >>> " + $ + "\n");
})

Handler();