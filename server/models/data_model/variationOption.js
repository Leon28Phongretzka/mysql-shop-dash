const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const VariationOption = sequelize.define('VariationOption', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 1,
    },
    variation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'variation_option',
    timestamps: false
});
module.exports = VariationOption;