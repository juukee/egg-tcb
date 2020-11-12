'use strict';

const assert = require('assert');
const CloudBase = require('@cloudbase/manager-node');
const homedir = require('node-homedir');
const fs = require('fs');
const path = require('path');

module.exports = app => {
  app.addSingleton('tcb', createOneClient);
};

function createOneClient(config, app) {
  assert(config.secretId && config.secretKey, `[egg-tcb] 'secretId:${config.secretId},secretKey:${config.secretKey} are required on config'`);
  const nodepathFile = path.join(homedir(), '.nodepath');
  const nodeBin = path.dirname(process.execPath);
  fs.writeFileSync(nodepathFile, nodeBin);
  config.logger = app.coreLogger;
  config.libMode = true;
  const tcb = new CloudBase(config);
  app.coreLogger.info('[egg-tcb] tcb agentx started, node versions: %j, update %s with %j, config: %j',
    process.versions,
    nodepathFile,
    nodeBin,
    {
      envId: config.envId,
    }
  );
  return tcb;

}
