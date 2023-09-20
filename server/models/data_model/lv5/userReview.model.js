const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const UserReview = sequelize.define('UserReview', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        defaultValue: 1,

    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        
    },
    ordered_product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    tableName: 'user_review',
    timestamps: false
});

module.exports = UserReview;