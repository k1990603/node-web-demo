/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\model\packingrecords.js
 */
const sequelizePaginate = require("sequelize-paginate");
const attribute_builder = Sequelize => {
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;
  const attribute_obj = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    env: {
      type: STRING(256),
      comment: "环境",
    },
    author: {
      type: STRING(64),
      comment: "作者  名字 ",
    },
    mark: {
      type: TEXT,
      comment: "备注",
    },
  };
  return attribute_obj;
};
module.exports = app => {
  const packingrecords = app.model.define("packingrecords", attribute_builder(app.Sequelize));
  sequelizePaginate.paginate(packingrecords);

  return packingrecords;
};
