'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
let arr =[]
 for(let i=1;i<20;i++){
  arr.push({
    name:"test--数据--"+i,
    order:i,
    created_at: new Date(),
    updated_at:  new Date(),
  })
 }

  await queryInterface.bulkInsert('language', arr, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('language', null, {});
  }
};
