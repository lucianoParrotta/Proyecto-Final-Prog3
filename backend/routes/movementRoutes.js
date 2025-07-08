const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

// Rutas CRUD
router.get('/', movementController.getAll);
router.get('/:id', movementController.getById);
router.post('/', movementController.create);
router.delete('/:id', movementController.delete);

module.exports = router;