'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = `hello tcb, enable: ${this.app.config.tcb.enable}`;
  });
};
