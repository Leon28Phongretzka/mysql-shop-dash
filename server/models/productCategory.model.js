const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const ProductCategory = sequelize.define('ProductCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_category',
    timestamps: false
});

module.exports = ProductCategory;