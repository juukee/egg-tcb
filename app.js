'use strict';

const tcb = require('./lib/tcb');

module.exports = app => {
  const config = app.config.tcb;
  if (!config.enable) {
    app.coreLogger.info('[egg-tcb] disable');
    return;
  }
  if (app.config.tcb.app) tcb(app);
};

