/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\202207231142016-menu.js
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

    const { INTEGER, DATE, STRING, TEXT } = Sequelize;

    await queryInterface.createTable("menu", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name_zh: {
        type: STRING(32),
        comment: "菜单名字中文",
      },
      name_en: {
        type: STRING(32),
        comment: "菜单名字英文",
      },
      // 菜单类型
      type: {
        type: INTEGER,
        defaultValue: 1,
        comment: "1  有子菜单  2 无子菜单",
      },
      //备注
      mark: {
        type: TEXT,
        comment: "备注",
      },
      //父级菜单
      father_id: {
        type: INTEGER,
        allowNull: false,
        comment: "父级菜单 ID ",
      },
      state: {
        type: INTEGER,
        comment: "状态，1开启 -1关闭",
      },
      mulit_language: {
        type: TEXT,
        comment: "多语言 json 字符串",
      },
      order: {
        type: INTEGER,
        comment: "菜单排序，越小越靠前",
      },
      // 映射文档id  只有 文件类型才有意义
      related_doc: {
        type: INTEGER,
        comment: "映射文档id",
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
    await queryInterface.dropTable("menu");
  },
};
