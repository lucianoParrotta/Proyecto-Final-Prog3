const { body } = require("express-validator");

const validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
];

module.exports = { validateCategory };
