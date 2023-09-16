const userPaymentMethodModel = require('../../../models/data_model/lv2/userPaymentMethod.model');
const paymentType = require('../../../models/data_model/lv1/paymentType.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserPaymentMethod = async (req, res) => {
    try {
        const userPaymentMethods = await userPaymentMethodModel.findAll({
            
        });
        res.status(200).json(userPaymentMethods);
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethods."
        });
    }
}

exports.getUserPaymentMethodById = async (req, res) => {
    try {
        
        const userPaymentMethod = await userPaymentMethodModel.findByPk(req.params.id);
        if (!userPaymentMethod) {
            return res.status(404).json({
                message: "userPaymentMethod not found with id " + req.params.id
            });
        }
        res.status(200).json(userPaymentMethod);       
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethod."
        });
    }
}

exports.createUserPaymentMethod = async (req, res) => {
    try {
        const payment_type_id = await paymentType.findOne({ 
            where: { 
                payment_type_name: req.body.payment_type_name 
            } 
        });
        const maxID = await userPaymentMethodModel.max('id');
        const userPaymentMethod = {
            id: maxID + 1,
            user_id: req.body.user_id,
            payment_type_id: payment_type_id.id,
            provider: req.body.provider,
            payment_account: req.body.payment_account,
            account_number: req.body.account_number,
            is_default: req.body.is_default
        }
        const newUserPaymentMethod = await userPaymentMethodModel.create(userPaymentMethod);
        res.status(200).json(newUserPaymentMethod);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethod."
        });
    }
}