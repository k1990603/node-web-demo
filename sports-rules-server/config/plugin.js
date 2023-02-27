/*
 * @Author:
 * @Description:
 * @FilePath: \sports-rules-server\config\plugin.js
 */
"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
};
