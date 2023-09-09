const orderStatusModel = require('../../models/data_model/orderStatus.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await orderStatusModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving max id."
        });
    }
}

exports.getAllOrderStatus = async (req, res) => {
    try {
        const orderStatuses = await orderStatusModel.findAll();
        res.status(200).json(orderStatuses);

    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving orderStatuses."
        });
    }
}

