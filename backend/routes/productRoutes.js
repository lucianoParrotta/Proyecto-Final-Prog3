const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//test (borrar)
router.get('/test', (req, res) => {
  res.json({ message: 'Ruta /api/products/test funciona' });
});



// Endpoints CRUD
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
