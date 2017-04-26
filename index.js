// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-log
// LICENSE: MIT
/** @module mocoolka-log-service */
const logManager = require('./lib/log');
const { serviceTools } = require('mocoolka-tools');
/**
 * start log service
 */
const startLogService =()=>{
  serviceTools.standServices(
    {
      logManager: {
        module: logManager,
        options:{}
      }
    }
  )
};
module.exports = startLogService;