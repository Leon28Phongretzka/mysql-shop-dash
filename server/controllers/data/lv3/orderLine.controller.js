const OrderLineModel = require('../../../models/data_model/lv3/orderLine.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllOrderLine = async (req, res) => {
    try {
        const OrderLines = await OrderLineModel.findAll();
        res.status(200).json(OrderLines);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving OrderLine."
        });
    }
}
exports.getOrderLineByID = async (req, res) => {
    try {
        const OrderLine = await OrderLineModel.findByPk(req.params.id);
        if (!OrderLine) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(OrderLine);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving OrderLine."
        }); 
    }
}
