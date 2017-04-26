# mocoolka-log
[![npm package](https://img.shields.io/npm/v/mocoolka-log.svg)](https://www.npmjs.com/package/mocoolka-log) 
[![license](https://img.shields.io/npm/l/mocoolka-log.svg)](LICENSE.md)
[![Build Status](https://secure.travis-ci.org/mocoolka/mocoolka-log.png?branch=master)](http://travis-ci.org/mocoolka/mocoolka-log)
Mocoolka-log is base module for mocoolka application and 
write message to file or database or mail.
[![NPM](https://nodei.co/npm/mocoolka-log.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mocoolka-log/)
[![codecov](https://codecov.io/gh/mocoolka/mocoolka-log/branch/master/graph/badge.svg)](https://codecov.io/gh/mocoolka/mocoolka-log)

## Install

```bash
$ npm install mocoolka-log
```

## Usage

first install mocoolka-setting and mocoolka-i18n

```bash
$ npm install mocoolka-setting
$ npm install mocoolka-i18n
```

edit log config in app.mk-setting.json 
```bash
  "mocoolka-log": {
    "log4js": {
      "appenders": {
        "mail": {
          "type": "smtp",
          "recipients": "fastspeeed@mocoolka.com",
          "from": "admin@mocoolka.com",
          "sendInterval": 5,
          "transport": "SMTP",
          "SMTP": {
            "host": "smtp.mocoolka.com",
            "secureConnection": true,
            "port": 25,
            "auth": {
              "user": "admin@mocoolka.com",
              "pass": "*****"
            },
            "debug": true
          }
        }
      },
      "categories": {
        "default": {
          "appenders": [
            "mocoolka",
            "mail"
          ],
          "level": "debug"
        }
      }
    }
  }
 ```

start micro service 

 ```bash
 const settingService = require('mocoolka-setting');
 settingService(__dirname);
 const i18nService = require('mocoolka-i18n');
 i18nService(__dirname);
 const logService = require('mocoolka-log');
 logService();
 ```

log using level
 ```bash
const {serviceTools } = require('mocoolka-tools');

serviceTools.standClientPromise('mocoolka-log','rfc5424',
  {level:'info',message:{id:'test123'}}).catch(error=>{
      console.error(error);
  });
serviceTools.standClientPromise('mocoolka-log','emergency',
  {id:'emergency-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','alert',
  {id:'alert-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','critical',
  {id:'critical-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','error',
  {id:'error-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','warning',
  {id:'warning-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','notice',
  {id:'notice-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','info',
  {id:'info-client'}).catch(error=>{
  console.error(error);
});
serviceTools.standClientPromise('mocoolka-log','debug',
  {id:'debug-client'}).catch(error=>{
  console.error(error);
});
 ```


## Documentation

Available [here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/mocoolka/mocoolka-log/master/docs/index.html)

## License
Licensed under the MIT, version 2.0. (see [MIT](LICENSE.md)).
