const mock = require('mock-require');
mock('../lib/request.js', './helper/request');
const Service = require('../lib/service');
const ExpressApp = require('../lib/expressapp');
const requestsData = require('./fixtures/requests.json');
const request = require('request');
const ERR_STATUS = require('../lib/error/error').ERR_STATUS;
const should = require('chai').should();
mock.stopAll();

const opts = {
  port: 8080
};

describe("expressApp", () => {
  before((done) => {
    Service.setup((err) => {
      should.not.exist(err);
      let expressApp = new ExpressApp();
      expressApp.start(opts);
      done();
    });
  });

  describe('/breeds/list/all', () => {
    it('get dog breeds from dog ceo successfully', (done) => {
      let args = requestsData.listallbreeds;
      request(args, (err, res, body) => {
        body.code.should.equal(ERR_STATUS.SUCCESS);
        let expect = [{ "breed": 'affenpinscher' },
          { "breed": 'bulldog', "subbreed": 'boston' },
          { "breed": 'bulldog', "subbreed": 'english' },
          { "breed": 'bulldog', "subbreed": 'french' } ];
        expect.should.eql(body.message);
        done();
      });
    });
  });

  describe('/breed/images', () => {
    it('get images from dog ceo successfully', (done) => {
      let args = requestsData.getbreedimages;
      request(args, (err, res, body) => {
        body.code.should.equal(ERR_STATUS.SUCCESS);
        let expect = [
          'https://images.dog.ceo/breeds/bulldog-english/jager-1.jpg',
          'https://images.dog.ceo/breeds/bulldog-english/jager-2.jpg' ];
        expect.should.eql(body.message);
        done();
      });
    });
  });
})