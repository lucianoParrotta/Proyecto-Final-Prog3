const { body } = require("express-validator");

const validateMovement = [
  body("productId")
    .notEmpty()
    .withMessage("El producto es obligatorio")
    .isInt()
    .withMessage("El ID del producto debe ser un número"),

  body("type")
    .notEmpty()
    .withMessage("El tipo es obligatorio")
    .isIn(["entrada", "salida"])
    .withMessage("El tipo debe ser 'entrada' o 'salida'"),

  body("quantity")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a 0"),
];

module.exports = { validateMovement };
