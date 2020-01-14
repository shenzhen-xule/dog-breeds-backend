const config = require('./config');
const ExpressApp = require('./lib/expressapp');
const Service = require('./lib/service');

Service.setup((err) => {
  if (err) {
    process.exit(1);
  }
  let expressApp = new ExpressApp();
  expressApp.start({
    port: config.expressPort
  });
});
