/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\20220801091539-init-updaterecord.js
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

    const { INTEGER, DATE, STRING, TEXT, BOOLEAN } = Sequelize;

    await queryInterface.createTable("updaterecord", {
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

      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("updaterecord");
  },
};
