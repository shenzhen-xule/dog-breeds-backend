const log = require('npmlog');
const config = require('../../config');

function initLog() {
  log.level = config.logLevel;

  Object.defineProperty(global, '__stack', {
    get: function() {
      let orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack) {
        return stack;
      };
      let err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      let stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  Object.defineProperty(global, '__line', {
    get: function() {
      return __stack[1].getLineNumber();
    }
  });
  Object.defineProperty(global, '__file', {
    get: function() {
      return __stack[1].getFileName();
    }
  });
}

module.exports = function() {
  initLog();
  return {
    errorC: function(err, file, line) {
      log.stream = process.stderr;
      return log.error(err, new Date().toString(), file, line);
    },
    infoC: function(info, file, line) {
      log.stream = process.stdout;
      return log.info(info, new Date().toString(), file, line);
    }
  }
}();
