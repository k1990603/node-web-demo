/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\model\mddocpool.js
 */
const sequelizePaginate = require("sequelize-paginate");
const attribute_builder = Sequelize => {
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;
  const attribute_obj = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    language: {
      type: STRING(32),
      comment: "md文档语言 value ",
    },
    name: {
      type: STRING(128),
      comment: "md文档 文件 名字   ",
    },
    path: {
      type: STRING(256),
      comment: "md文档 文件 路径   ",
    },
    author: {
      type: STRING(64),
      comment: "md文档作者  名字 ",
    },
    document: {
      type: INTEGER,
      comment: "所属的的文档 id ",
    },

    state: {
      type: INTEGER,
      comment: "状态，1开启 -1关闭",
    },
    updated_at: DATE,
  };
  return attribute_obj;
};
module.exports = app => {
  const mddocpool = app.model.define("mddocpool", attribute_builder(app.Sequelize));
  sequelizePaginate.paginate(mddocpool);

  return mddocpool;
};
