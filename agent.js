'use strict';

const assert = require('assert');
const CloudBase = require('@cloudbase/manager-node');
const homedir = require('node-homedir');
const fs = require('fs');
const path = require('path');

module.exports = agent => {
  const config = agent.config.tcb;
  if (!config.enable) {
    agent.coreLogger.info('[egg-tcb] disable');
    return;
  }
  assert(config.secretId, 'config.tcb.secretId required');
  assert(config.secretKey, 'config.tcb.secretKey required');

  const nodepathFile = path.join(homedir(), '.nodepath');
  const nodeBin = path.dirname(process.execPath);
  fs.writeFileSync(nodepathFile, nodeBin);

  config.logger = agent.coreLogger;
  config.libMode = true;
  new CloudBase(config);
  agent.coreLogger.info('[egg-tcb] tcb agentx started, node versions: %j, update %s with %j, config: %j',
    process.versions,
    nodepathFile,
    nodeBin,
    {
      appid: config.appid,
    }
  );
};
