const { Product, Category, Movement } = require('../models');

module.exports = {
  // Obtener todos los productos con su categoría
  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [{ model: Category, as: 'category' }]
      });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  },

  // Obtener un producto por ID
  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category, as: 'category' }]
      });
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el producto' });
    }
  },

  // Crear un nuevo producto
  async create(req, res) {
    try {
      const { name, description, price, stock, categoryId } = req.body;
      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        categoryId
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  },

  // Actualizar un producto existente
  async update(req, res) {
    try {
      const { name, description, price, stock, categoryId } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      await product.update({
        name,
        description,
        price,
        stock,
        categoryId
      });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  },

  // Eliminar un producto
  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      await product.destroy();
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  }
};
