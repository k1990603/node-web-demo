/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\model\updaterecord.js
 */
const sequelizePaginate = require("sequelize-paginate");
const attribute_builder = Sequelize => {
  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = Sequelize;
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
    content_zh: {
      type: TEXT,
      comment: "内容中文",
    },
    content_en: {
      type: TEXT,
      comment: "内容英文",
    },

    document_staff: {
      type: TEXT,
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
    is_top: {
      type: BOOLEAN,
      comment: "置顶，true",
    },
  };
  return attribute_obj;
};
module.exports = app => {
  const updaterecord = app.model.define("updaterecord", attribute_builder(app.Sequelize));
  sequelizePaginate.paginate(updaterecord);
  return updaterecord;
};
