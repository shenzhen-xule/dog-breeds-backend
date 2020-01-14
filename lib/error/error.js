const sprintf = require('sprintf-js').sprintf;
const ERR_STATUS = {
  SUCCESS: 200,
  CONNECT_DOG_CEO_ERROR: 505,
};

class Error {
  constructor(errCode, message) {
    this.message = message;
    this.status = errCode;
  }

  toString() {
    return sprintf("%d:%s", this.status, this.message);
  }
}

module.exports.ERR_STATUS = ERR_STATUS;
module.exports.Error = Error;
