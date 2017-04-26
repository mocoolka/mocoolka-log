// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
/** @module mocoolka-log */

let log4js = require('./log4js/log4js');

const {
  fileTools, errorTools, serviceTools,typeTools,transformTools
} = require('mocoolka-tools');

/**
 * This callback is displayed as part of the no return data member.
 * @callback noDataCallback
 * @param {Object} error - Determines whether the function have error.null if no error;
 */
/**
 * init log.
 * default config {
    log4js: {
      appenders: {
        mocoolka: {
          type: 'file',
          filename: fileTools.path(__dirname, '..', 'logs', 'exceptions.log'),
        },
      },
      categories: {default: {appenders: ['mocoolka'], level: 'debug'}}
    },
    DISABLE_CONSOLE: false,
  }
 change default config using mocoolka-setting
 * start mocoolka-setting service and mocoolka-i18n service before call init
 * @param {Object}options - no any options now
 * @param {noDataCallback} callback
 */
const init = (options, callback)=> {
  if(!typeTools.isFunction(callback))
    return;
  try {
  serviceTools.standClient('mocoolka-setting', 'applyModuleSetting',
    {moduleName: logManager.moduleName, moduleDefaultSetting: logManager.setting}, (errors, data)=> {
      if (errors) {
        callback(errors);
        return;
      }
      logManager.setting = data;
      //fileTools.createDirNotExist(logManager.setting);
      log4js.configure(logManager.setting.log4js);
      serviceTools.standClient('mocoolka-i18n', 'loadMessage',
        {rootPath: fileTools.path(__dirname, '..', 'intl')}, (error, data)=> {
          if (error) {
            callback(errors);
            return;
          }
          info({id: 'log/start'}, (error, data)=> {
            if (error)
              console.error(error);
          })
          callback(null)
        });
    })
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};

const getLogFunction = (level, data)=> {
  "use strict";
  log4js.getLogger('mocoolka').log(level, data);
}

/**
 * RFC 5424 Syslog
 * @param {Object} msg
 * @property {string} msg.level -log level
 *  emergency: system is unusable
 *  alert: action must be taken immediately
 *  critical: critical conditions
 *  error: error conditions
 *  warning: warning conditions
 *  notice: normal but significant condition
 *  info: informational messages
 *  debug: debug-level messages
 *  @property {Object} msg.message - i18n message
 *  @property {string} msg.message.id - i18n message id
 *  @property {Object} msg.message.value - i18n message value
 *  @property {string} msg.stack - error stack
 * @param {noDataCallback}callback
 */
const rfc5424 = (msg, callback)=> {
  if(!typeTools.isFunction(callback))
    return;
  try {
  errorTools.validateJsonSchema({
      schema: logManager.schemas.rfc5424,
      data: msg
    });

  let level = msg.level || 'info';
  let message = msg.message;
  let stack = message.stack;
  let messageContent = message;
  serviceTools.standClient('mocoolka-i18n', 'formatAbbreviations',
    message, (error, data)=> {
      if (error)
        messageContent = message;
      if (data.result) {
        messageContent = data.result
      }
      if (stack)
        messageContent.stack = stack;

      if(typeTools.isObject(messageContent)){
        messageContent=transformTools.objectToString(messageContent);
      }
      getLogFunction(level, messageContent);
      if (!logManager.setting.DISABLE_CONSOLE && logManager.levels[level] > logManager.levels.warning)
        console.error(messageContent);
      else
        console.log(messageContent);
      callback(null )
    });
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * system is unusable .see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const emergency = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'emergency', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }

};
/**
 * action must be taken immediately .see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const alert = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'alert', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * critical conditions .see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const critical = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'critical', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * error conditions .see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const error = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'error', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * warning conditions.see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const warning = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'warning', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * normal but significant condition.see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const notice = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'notice', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};
/**
 * informational messages .see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const info = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'info', message: msg}, callback);
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }

};
/**
 * debug-level messages.see RFC 5424 Syslog.
 *  @param {Object} msg - i18n message
 *  @property {string} message.id - i18n message id
 *  @property {Object} message.value - i18n message value
 *  @property {string} stack - error stack
 * @param {noDataCallback}callback
 */
const debug = (msg, callback)=> {
  if (!typeTools.isFunction(callback))
    return;
  try {
  rfc5424({level: 'debug', message: msg}, callback)
  }
  catch (ex) {
    errorTools.errorHandler(ex, callback);
  }
};

let logManager = {
  moduleName: 'mocoolka-log',
  init,
  setting: {
    log4js: {
      appenders: {
        mocoolka: {
          type: 'file',
          filename: fileTools.path(__dirname, '..', 'logs', 'exceptions.log'),
        },
      },
      categories: {default: {appenders: ['mocoolka'], level: 'debug'}}
    },
    DISABLE_CONSOLE: false,
  },
  levels: {
    emergency: 150000,
    alert: 50000,
    critical: 45000,
    error: 40000,
    warning: 30000,
    notice: 25000,
    info: 20000,
    debug: 10000,
  },
  actions: {
    emergency,
    alert,
    critical,
    error,
    warning,
    notice,
    info,
    debug,
    rfc5424,
  },
  schemas: {
    rfc5424: {
      properties: {
        level: {
          type: 'string',
          enum: ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'],
        },
        message: {
          properties: {
            value: {
              type: 'object',
            },
            id: {
              type: 'string',
            },
            stack: {
              type: 'string',
            }
          },
          required: ['id'],
        }
      },
      required: ['level', 'message'],
    }
  },

};
module.exports = logManager;

