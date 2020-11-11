'use strict';

const path = require('path');
const mkdirp = require('mkdirp');

module.exports = appInfo => {
  const exports = {};

  const appRoot = appInfo.env === 'local' || appInfo.env === 'unittest' ? appInfo.baseDir : appInfo.HOME;
  let tcbLogdir = path.join(appRoot, 'logs/tcb');
  // try to use NODE_LOG_DIR first
  if (process.env.NODE_LOG_DIR) {
    tcbLogdir = process.env.NODE_LOG_DIR;
  }
  mkdirp.sync(tcbLogdir);
  /**
 * egg-tcb default config
 * @member Config#tcb
 * @property {String} SOME_KEY - some description
 */
  exports.tcb = {
    enable: true,
    secretId: '',
    secretKey: '',
    token: '',
    envId: '',
    proxy: '',
    region: '',
    cmddir: path.dirname(require.resolve('commandx/package.json')),
    logdir: tcbLogdir,
    error_log: [
      path.join(appRoot, `logs/${appInfo.pkg.name}/common-error.log`),
      path.join(appRoot, 'logs/stderr.log'),
    ],
    // seconds
    reconnectDelay: 10,
    heartbeatInterval: 60,
    reportInterval: 60,
  };

  return exports;
};
