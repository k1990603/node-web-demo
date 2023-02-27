/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\20220830124152-init-packingrecords.js
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

    await queryInterface.createTable("packingrecords", {
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
    await queryInterface.dropTable("packingrecords");
  },
};
