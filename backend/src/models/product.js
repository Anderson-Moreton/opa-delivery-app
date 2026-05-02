'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.FLOAT
    },
    illustration: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};