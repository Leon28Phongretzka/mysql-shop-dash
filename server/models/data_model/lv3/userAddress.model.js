const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const UserAddress = sequelize.define('UserAddress', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        // defaultValue: 1,
    },
    is_default: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
   
}, {
    tableName: 'user_address',
    timestamps: false
});

module.exports = UserAddress;