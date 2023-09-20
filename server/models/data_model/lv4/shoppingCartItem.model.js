const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const ShoppingCartItem = sequelize.define('ShoppingCartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: 1,
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        
    },
    product_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    
}, {
    tableName: 'shopping_cart_item',
    timestamps: false
});

module.exports = ShoppingCartItem;