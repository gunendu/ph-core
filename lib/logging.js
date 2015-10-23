var bunyan = require('bunyan');

var moduleMap = {};
/**
 *
 * @param name String
 * @returns {Logger}
 */
var PhLogger = function (name) {
  if(!name) throw new Error("Logger name is required");
  if (name in moduleMap) {
    return moduleMap[name]
  } else {
    var logger = bunyan.createLogger({
      name: name,
      streams : [
        {
          stream: process.stdout,
          level: 'debug'
        },
        {
          type: 'rotating-file',
          path: '/var/log/www/info.log',
          period: '1d',   // daily rotation
          count: 3        // keep 3 back copies
        }
      ]

    });
    moduleMap[name] = logger;
    return logger;
  }
};

module.exports = PhLogger;
