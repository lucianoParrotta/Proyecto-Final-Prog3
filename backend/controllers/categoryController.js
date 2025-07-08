const { Category } = require('../models');

module.exports = {
  // Obtener todas las categorías
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener categorías' });
    }
  },

  // Obtener una categoría por ID
  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la categoría' });
    }
  },

  // Crear una nueva categoría
  async create(req, res) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la categoría' });
    }
  },

  // Actualizar una categoría existente
  async update(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      await category.update({ name });
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
  },

  // Eliminar una categoría
  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      await category.destroy();
      res.json({ message: 'Categoría eliminada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
  }
};