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


 

  
    await queryInterface.createTable("document", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name_zh: {
      type: STRING(128),
      comment: "文档名字中文",
    },
    name_en: {
      type: STRING(128),
      comment: "文档名字英文",
    },
  
    //备注
    mark: { 
        type: TEXT ,
        comment: "备注",
    },
 
    state: {
      type: INTEGER,
      comment: "状态，1开启 -1关闭",
    },
    mulit_language: {
      type: TEXT,
      comment: "多语言启用配置 json 字符串 { zh_cn: 1 ,zh_tw:-1 }   ",
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
    await queryInterface.dropTable("document");
  },
};
