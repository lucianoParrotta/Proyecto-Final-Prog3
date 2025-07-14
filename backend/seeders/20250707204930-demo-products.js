'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Auriculares Bluetooth',
        description: 'Auriculares inalámbricos',
        price: 15000,
        stock: 25,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lámpara LED',
        description: 'Lámpara blanca bajo consumo',
        price: 4000,
        stock: 40,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Control Remoto Universal',
        description: 'Compatible con múltiples marcas',
        price: 2500,
        stock: 30,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Set de ollas',
        description: 'Incluye 5 piezas de cocina',
        price: 20000,
        stock: 15,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rompecabezas 1000 piezas',
        description: 'Puzzle de paisaje',
        price: 3500,
        stock: 50,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Auto a control remoto',
        description: 'Juguete con batería recargable',
        price: 8000,
        stock: 20,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
