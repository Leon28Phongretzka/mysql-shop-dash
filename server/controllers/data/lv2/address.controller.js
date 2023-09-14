const AddressModel = require('../../../models/data_model/lv2/address.model');
const CountryModel = require('../../../models/data_model/lv1/country.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');

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
    const country_id = await CountryModel.findOne({
        where: {
            country_name: req.body.country_name
        }
    })
    const maxID = await AddressModel.max('id');
    try {
        const address = {
            id: maxID + 1,
            unit_number: req.body.unit_number,
            street_number: req.body.street_number,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            region: req.body.region,
            postal_code: req.body.postal_code,
            country_id: country_id.id,
        }
        console.log(address);
        // if(address) {
        //     return res.status(400).json({
        //         message: "Address already exists."
        //     });
        // }
        await AddressModel.create(address);
        res.status(201).json(address);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the address."
        });
    }
}

exports.updateAddress = async (req, res) => {
    const country_id = await CountryModel.findOne({
        where: {
            country_name: req.body.country_name
        }
    })
    try {
        const address = {
            unit_number: req.body.unit_number,
            street_number: req.body.street_number,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            region: req.body.region,
            postal_code: req.body.postal_code,
            country_id: country_id.id,
        }
        const updatedAddress = await AddressModel.update(address, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json("Update complete");
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the address."
        });
    }
}