/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\model\document.js
 */
const sequelizePaginate = require("sequelize-paginate");
const attribute_builder = Sequelize => {
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;
  const attribute_obj = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name_zh: {
      type: STRING(128),
      comment: "文档名字中文",
    },
    name_en: {
      type: STRING(128),
      comment: "文档名字英文",
    },

    //备注
    mark: {
      type: TEXT,
      comment: "备注",
    },

    state: {
      type: INTEGER,
      comment: "状态，1开启 -1关闭",
    },
    mulit_language: {
      type: TEXT,
      comment: "多语言启用配置 json 字符串 { zh_cn: 1 ,zh_tw:-1 }   ",
    },
  };
  return attribute_obj;
};
module.exports = app => {
  const document = app.model.define("document", attribute_builder(app.Sequelize));
  sequelizePaginate.paginate(document);
  return document;
};
