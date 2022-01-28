import Path from "path";
import Module from "module";
import Process from "process";

const URL = import.meta.url.replace("file" + ":" + "//", "");
const Import = Module.createRequire(URL);

const API = JSON.stringify(Import("./server/api.json"));
const Redis = JSON.stringify(Import("./server/redis.json"));
const Cluster = JSON.stringify(Import("./server/cluster.json"));

const Package = JSON.stringify(Import(Path.join(Process.cwd(), "package.json"))) ?? JSON.stringify({version: null});

process.env = { ... process.env, ... { api: API} };
process.env = { ... process.env, ... { redis: Redis} };
process.env = { ... process.env, ... { cluster: Cluster} };
process.env = { ... process.env, ... { package: Package} };

console.debug(process.env);

const Settings = {
    API: JSON.parse(API),
    Redis: JSON.parse(Redis),
    Cluster: JSON.parse(Cluster),
    Package: JSON.parse(Package)
};

export { Settings };

export default Settings;
