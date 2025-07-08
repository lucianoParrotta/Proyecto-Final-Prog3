'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Electrónica', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hogar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Juguetes', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
