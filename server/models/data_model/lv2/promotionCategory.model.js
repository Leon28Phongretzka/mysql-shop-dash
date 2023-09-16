const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const promotionCategory = sequelize.define('promotionCategory', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    tableName: 'promotion_category',
    timestamps: false
});

module.exports = promotionCategory;