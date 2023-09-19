const UserAddressModel = require('../../../models/data_model/lv3/userAddress.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserAddress = async (req, res) => {
    try {
        const UserAddresss = await UserAddressModel.findAll();
        res.status(200).json(UserAddresss);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddresss."
        });
    }
}
