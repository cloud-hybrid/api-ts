import FS from "fs";
import Path from "path";
import Assertion from "assert";

export const URL = import.meta.url;

export const File = URL.replace("file" + ":" + "//", "");
export const Normalize = Path.normalize(File);
export const Directory = Path.dirname(Normalize);

export const Target = Path.join(Directory, "Settings.json");

export const validate = () => {
    try {
        const Message = "Settings.json Not Found";
        const Expectation = FS.existsSync(Target);

        Assertion.equal(Expectation, true, Message);
    } catch ( error ) {
        const $ = new Error(Message);

        $.error = true;
        $.module = import.meta.url;

        $.target = Target;
        $.namespace = File;

        $.name = "Settings-File-Not-Found-Error";

        const Throw = () => {
            throw $;
        };

        return (!$.error) ? true : Throw();
    }

    return true;
};

export default validate();