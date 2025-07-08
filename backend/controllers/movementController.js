const { Movement, Product } = require('../models');

module.exports = {
  // Obtener todos los movimientos
  async getAll(req, res) {
    try {
      const movements = await Movement.findAll({
        include: [{ model: Product, as: 'product' }]
      });
      res.json(movements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener movimientos' });
    }
  },

  // Obtener un movimiento por ID
  async getById(req, res) {
    try {
      const movement = await Movement.findByPk(req.params.id, {
        include: [{ model: Product, as: 'product' }]
      });
      if (!movement) {
        return res.status(404).json({ message: 'Movimiento no encontrado' });
      }
      res.json(movement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el movimiento' });
    }
  },

  // Crear un movimiento
  async create(req, res) {
    const transaction = await Movement.sequelize.transaction();
    try {
      const { productId, quantity, type } = req.body;

      const product = await Product.findByPk(productId, { transaction });
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Actualizar stock
      let newStock = product.stock;
      if (type === 'entrada') {
        newStock += quantity;
      } else if (type === 'salida') {
        if (quantity > product.stock) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        newStock -= quantity;
      } else {
        return res.status(400).json({ message: 'Tipo de movimiento inválido' });
      }

      await product.update({ stock: newStock }, { transaction });

      // Crear el movimiento
      const newMovement = await Movement.create(
        {
          productId,
          quantity,
          type,
          date: new Date()
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json(newMovement);
    } catch (error) {
      console.error(error);
      await transaction.rollback();
      res.status(500).json({ message: 'Error al crear el movimiento' });
    }
  },

  // Eliminar un movimiento
  async delete(req, res) {
    try {
      const movement = await Movement.findByPk(req.params.id);
      if (!movement) {
        return res.status(404).json({ message: 'Movimiento no encontrado' });
      }
      await movement.destroy();
      res.json({ message: 'Movimiento eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el movimiento' });
    }
  }
};