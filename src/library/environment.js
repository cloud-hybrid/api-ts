import * as FS from "fs";
import * as Assertion from "assert";

const Variables = [
    ["CI", typeof Boolean()],
    ["GitHub", typeof Object()],
    ["GitLab", typeof Object()],
    ["Server", typeof String()],
    ["Environment", typeof String()]
];

const Content = () => String(FS.readFileSync(".env", {encoding: "UTF-8"}));

const Error = (Variable) => String("Environment Variable" + " (" + Variable[0] + ")" + " " + "Type !:=" + " " + Variable[1]);

process.env = {... process.env, ... JSON.parse(Content())};

Variables.forEach((Variable) => {
    Assertion.strictEqual(typeof process.env[Variable[0]], Variable[1], Error(Variable));
});

export const Inject = () => process.env = {... process.env, ... JSON.parse(Content())};
