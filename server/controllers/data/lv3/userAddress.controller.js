const UserAddressModel = require('../../../models/data_model/lv3/userAddress.model');
const AddressModel = require('../../../models/data_model/lv2/address.model');
const CountryModel = require('../../../models/data_model/lv1/country.model');
const UserModel = require('../../../models/auth_model/user.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserAddress = async (req, res) => {
    try {
        const UserAddresss = await UserAddressModel.findAll();
        const UserAddressPromise = UserAddresss.map(async (UserAddress) => {
            const address = await AddressModel.findByPk(UserAddress.address_id);
            const country = await CountryModel.findByPk(address.country_id);
            const user = await UserModel.findByPk(UserAddress.user_id);
            delete UserAddress.dataValues.address_id;
            delete UserAddress.dataValues.user_id;
            return {
                ...UserAddress.dataValues,
                address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
                user: user.email_address,
            }
        });
        res.status(200).json(await Promise.all(UserAddressPromise));
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddresss."
        });
    }
}

exports.getUserAddressByID = async (req, res) => {
    try {
        const UserAddress = await UserAddressModel.findByPk(req.params.id);
        if (!UserAddress) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const address = await AddressModel.findByPk(UserAddress.address_id);
        const country = await CountryModel.findByPk(address.country_id);
        const user = await UserModel.findByPk(UserAddress.user_id);
        delete UserAddress.dataValues.address_id;
        delete UserAddress.dataValues.user_id;
        const UserAddressPromise = {
            ...UserAddress.dataValues,
            address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
            user: user.email_address,
        }
        res.status(200).json(UserAddressPromise);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddress."
        });
    }
}

exports.createUserAddress = async (req, res) => {
    try {
        const Address = await AddressModel.create({
            
        })
        const UserAddress = await UserAddressModel.create({
            user_id: req.body.user_id,
            address_id: req.body.address_id,
            is_default: req.body.is_default,
        });
        res.status(200).json(UserAddress);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddress."
        })
    }
}

exports.updateUserAddress = async (req, res) => {
    try {
        const UserAddress = await UserAddressModel.update({
            user_id: req.body.user_id,
            address_id: req.body.address_id,
            is_default: req.body.is_default,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(UserAddress);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddress."
        })
    }
}

exports.deleteUserAddress = async (req, res) => {
    try {
        const UserAddress = await UserAddressModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(UserAddress);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserAddress."
        })
    }
}