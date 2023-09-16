const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const ProductItem = sequelize.define('ProductItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    SKU: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'product_item',
    timestamps: false
});

module.exports = ProductItem;