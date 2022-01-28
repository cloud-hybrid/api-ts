import Default from "pino";

const $ = Default.destination({ sync: false });

const Logger = Default($);

export { Logger as Log, Default };

export default Logger;