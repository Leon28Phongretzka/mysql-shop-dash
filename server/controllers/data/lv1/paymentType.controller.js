const paymentType = require('../../../models/data_model/lv1/paymentType.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await paymentType.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving payment type."
        });
    }
}

exports.getAllPaymentType = async (req, res) => {
    // SQL script to get all Payment Type
    // SELECT * FROM payment_type;
    try {
        const paymentTypes = await paymentType.findAll();
        res.status(200).json(paymentTypes);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving payment types."
        });
    }
}

exports.updatePaymentType = async (req, res) => {
    // SQL script to update Payment Type with id in path
    // UPDATE payment_type SET type_name = :type_name WHERE id = :id;
    try {
        const paymentType = await PaymentType.findByPk(req.params.id);
        if (!paymentType) {
            return res.status(404).json({
                message: "Payment type not found with id " + req.params.id
            });
        }
        const updatedPaymentType = await paymentType.update(req.body);
        res.status(200).json(updatedPaymentType);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving payment type."
        });
    }
}



