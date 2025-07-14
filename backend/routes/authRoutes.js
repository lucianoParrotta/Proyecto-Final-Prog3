const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");
const { validateLogin } = require("../middleware/validateLogin");
const handleValidation = require("../middleware/handleValidation");

// Ruta de login
router.post("/login", validateLogin, handleValidation, loginUser);

module.exports = router;
