const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  update,
  delete: deleteCategory,
  getById
} = require("../controllers/categoryController");

const { validateCategory } = require("../middleware/validateCategory");
const handleValidation = require("../middleware/handleValidation");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.post("/", authenticateToken, validateCategory, handleValidation, create);
router.put("/:id", authenticateToken, validateCategory, handleValidation, update);
router.delete("/:id", authenticateToken, deleteCategory);

module.exports = router;