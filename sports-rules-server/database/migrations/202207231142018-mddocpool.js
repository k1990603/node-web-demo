/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\migrations\20220723114201-init-language.js
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

    const { INTEGER, DATE, STRING,TEXT } = Sequelize;


 

  
    await queryInterface.createTable("mddocpool", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      language:{
        type: STRING(32),
        comment: "md文档语言 value ",
      },
      name:{
        type:STRING(128),
        comment: "md文档 文件 名字   ",
      },
      path:{
        type:STRING(256),
        comment: "md文档 文件 路径   ",
      },
      author:{
        type:STRING(64),
        comment: "md文档作者  名字 ",
      },
      document:{
        type: INTEGER,
        comment: "所属的的文档 id ",
      },
    
      state: {
        type: INTEGER,
        comment: "状态，1开启 -1关闭",
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
    await queryInterface.dropTable("mddocpool");
  },
};
