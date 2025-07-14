const { body } = require("express-validator");

const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  body("price")
    .isNumeric()
    .withMessage("El precio debe ser un número"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo"),

  body("categoryId")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
];

module.exports = { validateProduct };
