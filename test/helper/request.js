const dogCeoResponse = require('../fixtures/dogceoresponses');
class Request {
  constructor() {
  }

  doRequest(method, url, body, cb) {
    if(url === '/breeds/list/all') {
      return cb(null, null, dogCeoResponse.listallbreeds);
    } else if(url === '/breed/bulldog/images') {
      return cb(null, null, dogCeoResponse.getbreedimages);
    }
  }
}

module.exports = Request;