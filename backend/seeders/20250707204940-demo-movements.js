'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      `SELECT id FROM "Products";`
    );

    const productIds = products[0].map(p => p.id);

    if (productIds.length === 0) return;

    await queryInterface.bulkInsert('Movements', [
      {
        productId: productIds[0],
        quantity: 10,
        type: 'entrada',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productIds[1],
        quantity: 2,
        type: 'salida',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productIds[2],
        quantity: 15,
        type: 'entrada',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productIds[3],
        quantity: 5,
        type: 'salida',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productIds[4],
        quantity: 20,
        type: 'entrada',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productIds[5],
        quantity: 5,
        type: 'salida',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movements', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};