const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const shoppingCart = sequelize.define('shoppingCart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'shopping_cart',
    timestamps: false
});
module.exports = shoppingCart;