/*
 * @Author:
 * @Description:
 * @FilePath: \sports-rules-server\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1657953448120_1580";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  config.cluster = {
    listen: {
      port: 37111,
      hostname: '127.0.0.1'
      // hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };

  config.multipart = {
    mode: "file",
    fileExtensions: [".md"],
  };
  exports.assets = {
    publicPath: "/public/",
  };
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".nj": "nunjucks",
      ".tpl": "nunjucks",
    },
  };

  exports.security = {
    xframe: {
      enable: false,
      ignoreJSON: true,
    },
    csrf: {
      enable: false,
      ignore: "/api/",
      // ignore: ctx => {
      //   return   true  ; // path or ip
      // },
      supportedRequests: [
        // supported URL path and method, the package will match URL path regex patterns one by one until path matched. We recommend you set {path: /^\//, methods:['POST','PATCH','DELETE','PUT','CONNECT']} as the last rule in the list, which is also the default config.
        { path: /.*/, methods: ["POST", "GET", "CONNECT"] },
      ],
    },
  };

  exports.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    connectionUri: "mysql://tyweb:tyweb@123@127.0.0.1:6606/sports_rules_prod",
    database: "sports_rules_prod",
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: '123456',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options

    // logging(...args) {
    //   // if benchmark enabled, log used
    //   const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
    //   app.logger.info('[egg-sequelize]%s %s', used, args[0]);
    // },
    define: {
      freezeTableName: true,
      underscored: true,
    },
  };

  exports.cors = {
    // {string|Function} origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'

    origin: "*",
    allowMethods: "GET,POST",
  };

  return {
    ...config,
  };
};
