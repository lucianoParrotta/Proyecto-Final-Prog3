const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

module.exports = {
  // Login de usuario
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Buscar el usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas (email)" });
      }

      // Comparar contraseñas
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciales inválidas (password)" });
      }

      // Generar token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "8h"
      });

      res.json({ token });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ message: "Error al procesar el inicio de sesión" });
    }
  }
};