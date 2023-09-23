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

exports.createShopOrder = async (req, res) => {
    try {
        const maxID = await ShopOrderModel.max('id');
        const ShopOrder = await ShopOrderModel.create({
            id: maxID + 1,
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            order_total: req.body.order_total,
            order_status: req.body.order_status,
            payment_method_id: req.body.payment_method_id,
            shipping_address: req.body.shipping_address,
            shipping_method: req.body.shipping_method,
        });
        res.status(200).json(ShopOrder);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        })
    }
}

exports.updateShopOrder = async (req, res) => {
    try {
        const ShopOrder = await ShopOrderModel.update({
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            order_total: req.body.order_total,
            order_status: req.body.order_status,
            payment_method_id: req.body.payment_method_id,
            shipping_address: req.body.shipping_address,
            shipping_method: req.body.shipping_method,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(ShopOrder);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        })
    }
}
