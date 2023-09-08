const AddressModel = require('../../models/address.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');

exports.getAllAddress = async (req, res) => {
    try {
        const addresses = await AddressModel.findAll();
        res.status(200).json(addresses);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving addresses."
        });
    }
}

