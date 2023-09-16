const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const userPaymentMethod = sequelize.define('userPaymentMethod', {
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
    payment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'user_payment_method',
    timestamps: false
});

module.exports = userPaymentMethod;