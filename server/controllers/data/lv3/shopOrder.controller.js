const ShopOrderModel = require('../../../models/data_model/lv3/shopOrder.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllShopOrder = async (req, res) => {
    try {
        const ShopOrders = await ShopOrderModel.findAll();
        res.status(200).json(ShopOrders);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        });
    }
}
exports.getShopOrderByID = async (req, res) => {
    try {
        const ShopOrder = await ShopOrderModel.findByPk(req.params.id);
        if (!ShopOrder) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(ShopOrder);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrderBy."
        }); 
    }
}
