/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\database\seeders\20220723124422-language2.js
 */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const t = new Date();
    let arr = [
      {
        name_zh: "中文简体",
        name_en: "Chinese",
        value: "zh_cn",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "中文繁体",
        name_en: "Traditional Chinese",
        value: "zh_tw",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "英文",
        name_en: "English",
        value: "en_gb",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "越南语",
        name_en: "Vietnamese",
        value: "vi_vn",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "泰语",
        name_en: "Thai",
        value: "th_th",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "韩语",
        name_en: "Korean",
        value: "ko_kr",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "印度语",
        name_en: "Hindi",
        value: "id_id",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "葡萄牙语",
        name_en: "Portuguese",
        value: "pt_br",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "柬埔寨语",
        name_en: "Cambodian",
        value: "km_kh",
        order: 1,
        created_at: t,
        updated_at: t,
      },
      {
        name_zh: "日本语",
        name_en: "Japanese",
        value: "ja_jp",
        order: 1,
        created_at: t,
        updated_at: t,
      },
    ];

    await queryInterface.bulkInsert("language", arr, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("language", null, {});
  },
};
