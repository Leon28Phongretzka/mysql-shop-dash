const UserAddressModel = require('../../../models/data_model/lv3/userAddress.model');
const AddressModel = require('../../../models/data_model/lv2/address.model');
const UserModel = require('../../../models/auth_model/user.model');
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

exports.getUserAddressByID = async (req, res) => {
    try {
        const SiteUser = await UserModel.findOne({
            where: {
                id: req.params.id
            },
        });
        const UserAddresses = await UserAddressModel.findAll({
            where: {
                user_id: SiteUser.id
            },
        });
        res.status(200).json(UserAddresses);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddress."
        });
    }
}

exports.createUserAddress = async (req, res) => {
    
}