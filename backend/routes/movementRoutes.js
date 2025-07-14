const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  create,
  delete: deleteMovement
} = require("../controllers/movementController");

const { validateMovement } = require("../middleware/validateMovement");
const handleValidation = require("../middleware/handleValidation");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.post("/", authenticateToken, validateMovement, handleValidation, create);
router.delete("/:id", authenticateToken, deleteMovement);

module.exports = router;
