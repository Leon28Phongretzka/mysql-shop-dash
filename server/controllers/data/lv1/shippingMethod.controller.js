const ShippingMethodModel = require('../../../models/data_model/lv1/shippingMethod.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllShippingMethod = async (req, res) => {
    // Truy vấn SQL lấy tất cả các ShippingMethod từ bảng shipping_method
    // SELECT * FROM shipping_method;
    try {
        const ShippingMethod = await ShippingMethodModel.findAll();
        res.status(200).json(ShippingMethod);

    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShippingMethod."
        });
    }
}

exports.getShippingMethodById = async (req, res) => {
    // Truy vấn SQL lấy ShippingMethod với id trong path
    // SELECT * FROM shipping_method WHERE id = :id;
    try {
        const ShippingMethod = await ShippingMethodModel.findByPk(req.params.id);
        if (!ShippingMethod) {
            return res.status(404).json({
                message: "ShippingMethod not found with id " + req.params.id
            });
        }
        res.status(200).json(ShippingMethod);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving ShippingMethod."
        });
    }
}