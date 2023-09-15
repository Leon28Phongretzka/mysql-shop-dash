const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const Variation = sequelize.define('Variation', {
    id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        defaultValue: 1,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // foreignKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},  {
    tableName: 'variation',
    timestamps: false,
});
module.exports = Variation;