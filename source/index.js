import Library from "@cloud-technology/library";

export const Application = Library.API();

Application.set("env", process.env["Environment"]);

Application.settings.etag = null;
Application.settings.views = null;

Application.settings["x-powered-by"] = null;
Application.settings["trust proxy"] = null;

Application.settings["environment"] = process.env["Environment"];

console.debug("[API] [Debug] Server Settings" + ":", JSON.stringify(Application.settings, null, 4));

/*** @type {Application} */
const Server = () => {
    return Application;
}

export { Server };

export default Server;
