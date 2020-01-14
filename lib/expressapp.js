const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Service = require('./service');
const cors = require('cors');
const SUCCESS = require('./error/error').ERR_STATUS.SUCCESS;

class ExpressApp {
  constructor() {
    this.app = express();
  }

  start(opts) {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    const morgan = require('morgan');
    morgan.token('time', () => {
      return new Date().toLocaleString();
    });
    const logFormat = ":time :method :url :status :res[content-length] :response-time :user-agent";
    this.app.use(morgan(logFormat));

    router.get('/breeds/list/all', (req, res) => {
      let server = new Service();
      server.getAllDogBreeds((err, result) => {
        if (err) {
          return res.send({
            code: err.status,
            message: err.message
          });
        }
        return res.send({
          code: SUCCESS,
          message: result
        });
      });
    });

    router.get('/breed/images', (req, res) => {
      let server = new Service();
      server.getAllBreedImageUrls(req, (err, result) => {
        if (err) {
          return res.send({
            code: err.status,
            message: err.message
          });
        }
        return res.send({
          code: SUCCESS,
          message: result
        });
      });
    });
    this.app.use('/api', router);
    this.app.listen(opts.port);
  }
}

module.exports = ExpressApp;
