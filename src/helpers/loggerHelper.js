const colors = require("console-log-colors");

const LogLevels = {
  Debug: 0,
  Info: 1,
  Success: 2,
  Warn: 3,
  Error: 4,
  Fatal: 5,
};

const prefixes = new Map([
  [LogLevels.Debug, "DEBUG"],
  [LogLevels.Info, "INFO"],
  [LogLevels.Success, "SUCCESS"],
  [LogLevels.Warn, "WARN"],
  [LogLevels.Error, "ERROR"],
  [LogLevels.Fatal, "FATAL"],
]);

const noColor = (str) => str;

const colorFunctions = new Map([
  [LogLevels.Debug, colors.gray],
  [LogLevels.Info, colors.cyan],
  [LogLevels.Success, colors.green.bold],
  [LogLevels.Warn, colors.yellow],
  [LogLevels.Error, colors.red],
  [LogLevels.Fatal, colors.red.bold.italic],
]);

function logger({ logLevel = LogLevels.Info, name } = {}) {
  function log(level, ...args) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const logMessage = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || "DEBUG"),
      name ? `${name} >` : ">",
      ...args,
    ];

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...logMessage);
      case LogLevels.Info:
        return console.info(...logMessage);
      case LogLevels.Success:
        return console.info(...logMessage);
      case LogLevels.Warn:
        return console.warn(...logMessage);
      case LogLevels.Error:
        return console.error(...logMessage);
      case LogLevels.Fatal:
        return console.error(...logMessage);
      default:
        return console.log(...logMessage);
    }
  }

  function setLevel(level) {
    logLevel = level;
  }
  function debug(...args) {
    log(LogLevels.Debug, ...args);
  }
  function info(...args) {
    log(LogLevels.Info, ...args);
  }
  function success(...args) {
    log(LogLevels.Success, ...args);
  }
  function warn(...args) {
    log(LogLevels.Warn, ...args);
  }
  function error(...args) {
    log(LogLevels.Error, ...args);
  }
  function fatal(...args) {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    success,
    warn,
    error,
    fatal,
  };
}

module.exports = logger;
