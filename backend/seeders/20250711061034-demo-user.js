"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash("Admin2025!", 10);
    await queryInterface.bulkInsert("Users", [
      {
        name: "Administrador",
        email: "admin@empresa.com",
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", { email: "admin@empresa.com" });
  }
};