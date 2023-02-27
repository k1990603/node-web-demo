'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     const { STRING, INTEGER, DATE, } =  Sequelize;
  
    const  confg = {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: {
        type: STRING(64),
        comment: "名字",
      },
      password:{
        type: STRING(64),
        comment: "密码",
      },
      admin:{
        type: INTEGER,
        comment: "管理员，1是 ，null,0 不是",
        defaultValue:0,
      },
      created_at:DATE,
      updated_at:DATE,

  
      
    }

     await queryInterface.createTable('user', confg);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('user');
  }
};
