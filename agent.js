'use strict';

const tcb = require('./lib/tcb');

module.exports = agent => {
  const config = agent.config.tcb;
  if (!config.enable) {
    agent.coreLogger.info('[egg-tcb] disable');
    return;
  }
  if (agent.config.tcb.agent) tcb(agent);
};

