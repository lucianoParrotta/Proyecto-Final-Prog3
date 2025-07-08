'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movements', [
      { productId: 1, quantity: 10, type: 'entrada', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, quantity: 2, type: 'salida', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { productId: 3, quantity: 15, type: 'entrada', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { productId: 4, quantity: 5, type: 'salida', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { productId: 6, quantity: 20, type: 'entrada', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { productId: 5, quantity: 5, type: 'salida', date: new Date(), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movements', null, {});
  }
};