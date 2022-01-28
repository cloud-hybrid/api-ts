import { Server } from "./index";
import { Controller } from "./controllers";
import { Middleware } from "./middleware";

const Application = Server();

await Middleware(Application);

Application.use("/", Controller);

/// const Content = {
///     Key: FS.readFileSync(Path.join(CWD, Process.env["TLS"]["Key"])),
///     PFX: FS.readFileSync(Path.join(CWD, Process.env["TLS"]["PFX"])),
///     Certificate: FS.readFileSync(
///         Path.join(CWD, Process.env["TLS"]["Certificate"])
///     )
/// };


Application.listen(3443, "0.0.0.0");