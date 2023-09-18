const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const ShopOrder = sequelize.define('ShopOrder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: 1,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull:false,
        
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    shipping_address: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    shipping_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    order_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'shop_order',
    timestamps: false
});

module.exports = ShopOrder;