const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const productConfig = sequelize.define('productConfig', {
    product_item_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    variation_option_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'product_config',
    timestamps: false
});

module.exports = productConfig;