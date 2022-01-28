const Global = Object.create({
    initialize: true
});

import * as Name from "./name.js";

import {
    ORM, Schema
} from "./../../index.js";

const Record = {
    Types: {
        Name: Name
    }, name: Name.Record
};

/***
 * Definition - Schema Instance that Defines a Model
 *
 * @type {ORM.Schema}
 */

export const Definition = new Schema({
    Name: {
        index: true,
        alias: "name",
        unique: true,
        required: true,
        trim: true,
        type: String
    }
});

const Instance = ORM.model("User", Definition, "User", false);

Record.instance = new Instance({Name: Record.name, Email: "schema@internal.io", Password: "Kn0wledge!"});

const Initialize = (await Instance.collection.stats()).count === 0;

(Global.initialize || Initialize) && await Record.instance.save(async (error) => {
    if ( error && (await Instance.collection.stats()).count === 0 ) {
        const e = new Error("[Fatal] Validation Failure").stack.split("\n");
        console.debug([e[0], e[1].trim(), "\n"].join(" "));

        await ORM.connection.collection("Name").findOneAndDelete(Record.name);

        throw error;
    } else {
        console.debug("[Debug]", "Successfully Established Database Record" + ":", "User");
    }
});

export default Instance;