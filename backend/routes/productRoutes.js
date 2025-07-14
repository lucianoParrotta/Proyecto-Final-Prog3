const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  update,
  delete: deleteProduct,
  getById
} = require("../controllers/productController");

const { validateProduct } = require("../middleware/validateProduct");
const handleValidation = require("../middleware/handleValidation");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.post("/", authenticateToken, validateProduct, handleValidation, create);
router.put("/:id", authenticateToken, validateProduct, handleValidation, update);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;