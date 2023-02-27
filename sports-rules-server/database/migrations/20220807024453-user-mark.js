/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\20220807024453-user-mark.js
 */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, DATE, TEXT } = Sequelize;
    return queryInterface.addColumn("user", "mark", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("user", mark);
  },
};
