const PaymentType = require('../../models/data/paymentType.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await PaymentType.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving payment type."
        });
    }
}

exports.getAllPaymentType = async (req, res) => {
    try {
        const paymentTypes = await PaymentType.findAll();
        res.status(200).json(paymentTypes);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving payment types."
        });
    }
}



