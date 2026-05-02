'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
    }
  }
  Order.init({
    cliente: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};