const { body } = require("express-validator");

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];

module.exports = { validateLogin };
