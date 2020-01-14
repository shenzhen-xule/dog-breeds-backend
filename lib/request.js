const request = require('request');
const config = require('../config');
class Request {
  constructor() {
    this.baseUrl = config.request.baseUrl;
    this.timeout = config.request.timeout;
    this.request = request;
  }

  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {object} body
   * @param cb
   */
  doRequest(method, url, body, cb) {
    const absUrl = this.baseUrl + url;
    const args = {
      method: method,
      url: absUrl,
      json: true,
      body: body,
      timeout: this.timeout
    };
    this.request(args, cb);
  }
}

module.exports = Request;
