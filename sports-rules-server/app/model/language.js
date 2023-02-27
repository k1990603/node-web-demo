/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\model\language.js
 */
// app/model/user.js

// sequelize.define(modelName, attributes, options)

const sequelizePaginate = require("sequelize-paginate");

const attribute_builder = Sequelize => {
  const { STRING, INTEGER, DATE } = Sequelize;
  const attribute_obj = {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name_zh: {
      type: STRING(32),
      comment: "语言名字英文",
    },
    name_en: {
      type: STRING(32),
      comment: "语言名字英文",
    },
    value: {
      type: STRING(32),
      comment: "语言的key 例如：zh_cn",
    },
    state: {
      type: INTEGER,
      comment: "状态，1开启 -1关闭 ",
    },
    default_language: {
      type: INTEGER,
      comment: "默认回落语言,只会有一个值,例如：1",
    },
    order: {
      type: INTEGER,
      comment: "语言排序，越小越靠前",
    },

    // It is possible to create foreign keys:
    // cb: {
    //     type: INTEGER,

    //     references: {
    //         comment: '语言回落 语种 ',
    //         // This is a reference to another model
    //         model: Language,

    //         // This is the column name of the referenced model
    //         key: 'id',

    //         // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
    //         //   deferrable: Deferrable.INITIALLY_IMMEDIATE
    //         // Options:
    //         // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
    //         // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
    //         // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    //     }
    // },
  };

  return attribute_obj;
};

module.exports = app => {
  const Language = app.model.define("language", attribute_builder(app.Sequelize));

  // Language.findByLogin = async function(login) {
  //   return await this.findOne({
  //     where: {
  //       login: login
  //     }
  //   });
  // }

  // don't use arraw function
  // Language.prototype.logSignin = async function() {
  //   return await this.update({ last_sign_in_at: new Date() });
  // }

  // Language.hasOne(Language, {
  //   foreignKey: {
  //     name: "cb",
  //     allowNull: true,
  //   },
  // });

  sequelizePaginate.paginate(Language);
  return Language;
};
