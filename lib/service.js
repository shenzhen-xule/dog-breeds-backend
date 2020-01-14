const Request = require('./request');
const log = require('./error/log');
const Error = require('./error/error').Error;
const ERR_STATUS = require('./error/error').ERR_STATUS;

let request;
class Service {
  static setup(cb) {
    request = new Request();
    return cb(null)
  }

  /**
   * return all dog breeds got from dog ceo api to front end
   * @param cb
   */
  getAllDogBreeds(cb) {
    // fetch all dog breeds from dog ceo api
    request.doRequest('GET', "/breeds/list/all", {}, (err, res, body) => {
      if (err) {
        log.errorC(err, __file, __line);
        return cb(new Error(ERR_STATUS.CONNECT_DOG_CEO_ERROR, 'connect dog ceo failed'));
      }
      // format list of dog breeds and subbreeds
      let breeds = [];
      for (let breed in body.message) {
        if (body.message[breed].length === 0) {
          breeds.push({
            breed: breed,
            subbreed: undefined
          })
        } else {
          body.message[breed].forEach(subBreed => breeds.push({
            breed: breed,
            subbreed: subBreed
          }))
        }
      }
      return cb(null, breeds)
    })
  }

  /**
   * return all image urls of required breed to front end
   * @param cb
   */
  getAllBreedImageUrls(req, cb) {
    // fetch all dog breeds from dog ceo api
    request.doRequest('GET', "/breed/" + req.query.breed + "/images", {}, (err, res, body) => {
      if (err) {
        log.errorC(err, __file, __line);
        return cb(new Error(ERR_STATUS.CONNECT_DOG_CEO_ERROR, 'connect dog ceo failed'));
      }
      let urls = body.message;
      // filter images
      if(req.query.subbreed) {
        urls = body.message.filter(url => url.indexOf(req.query.breed + '-' + req.query.subbreed) !== -1)
      }
      return cb(null, urls)
    })
  }

}

module.exports = Service;
