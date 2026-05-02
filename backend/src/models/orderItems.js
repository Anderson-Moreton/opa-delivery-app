'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderItems extends Model {
        static associate(models) {
        }
    }
    OrderItems.init({
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Orders',
                key: 'id',
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'OrderItems',
    });
    return OrderItems;
};