/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\202207231142015-init-language.js
 */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //  const model_config = attribute_builder({Sequelize})

    //  console.log( "model_config---",model_config );

    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable("language", {
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
        comment: "状态，开启或关闭",
      },
      default_language: {
        type: INTEGER,
        comment: "默认回落语言,只会有一个值,例如：1",
      },
      order: {
        type: INTEGER,
        comment: "语言排序，越小越靠前",
      },

      created_at: DATE,
      updated_at: DATE,

      // cb: {
      //   type: INTEGER,
      // },

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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("language");
  },
};
