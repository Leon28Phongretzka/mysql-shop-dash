const AddressModel = require('../../models/address.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');

exports.getCountryID = async (req, res) => {
    try {
        const address = await AddressModel.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(address.country_id);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving address."
        }); 
    }
}

exports.getAllAddress = async (req, res) => {
    try {
        // all rows and country_id -> country_name
        const addresses = await AddressModel.findAll();
        res.status(200).json(addresses);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving addresses."
        });
    }
}

exports.getAddress = async (req, res) => {
    try {
        const address = await AddressModel.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(address);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving address."
        });
    }
}

exports.createAddress = async (req, res) => {
    try {
        const address = await AddressModel.create(req.body);
        res.status(201).json(address);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the address."
        });
    }
}
