const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: 1,
    },
    product_item_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'order_line',
    timestamps: false
});

module.exports = OrderLine;