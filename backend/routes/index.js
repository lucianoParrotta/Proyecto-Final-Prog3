const express = require('express');
const router = express.Router();

// Importar los routers de cada entidad
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const movementRoutes = require('./movementRoutes');

// Ruta de prueba para ver que el API está vivo
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Aquí montás cada grupo de rutas bajo su prefijo
// Productos /api/products
router.use('/products', productRoutes);

// Categorías /api/categories
router.use('/categories', categoryRoutes);

// Movimientos
router.use('/movements', movementRoutes);

module.exports = router;