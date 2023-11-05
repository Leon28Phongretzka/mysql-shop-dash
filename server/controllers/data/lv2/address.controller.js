const AddressModel = require('../../../models/data_model/lv2/address.model');
const CountryModel = require('../../../models/data_model/lv1/country.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");


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
        // SQL script to get all address with country from country_id
        // SELECT address.*, country.country_name FROM address INNER JOIN country ON address.country_id = country.id ORDER BY id;
        const addresses = await AddressModel.findAll();
        const addressPromises = addresses.map(async (address) => {
            const country = await CountryModel.findByPk(address.country_id);
            delete address.dataValues.country_id;
            return { ...address.dataValues, country_name: country.country_name };
        });
        const addressWithCountry = await Promise.all(addressPromises);
        res.status(200).json(addressWithCountry);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving addresses."
        });
    }
}

exports.getAddress = async (req, res) => {
    try {
        // SQL script to get all address in table address with country from country_id in the country table with country_id = in from path
        // SELECT address.*, country.country_name FROM address INNER JOIN country ON address.country_id = country.id WHERE address.id = 1;
        const address = await AddressModel.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const country = await CountryModel.findByPk(address.country_id);
        delete address.dataValues.country_id;
        const addressWithCountry = { ...address.dataValues, country_name: country.country_name };
        res.status(200).json(addressWithCountry);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving address."
        });
    }
}

exports.createAddress = async (req, res) => {
    // Truy vấn SQL để tạo địa chỉ mới với input là id, unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_name và sau đó đổi country_name thành country_id thông qua bảng country

    // INSERT INTO address (id, unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_id) VALUES (505, 123, '4', 'Apartment 4A', '', 'San Francisco', 'CA', '94105', (SELECT id FROM country WHERE country_name = 'United States' LIMIT 1));

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
    // Truy vấn SQL để thay địa chỉ mới với input là id, unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_name và sau đó đổi country_name thành country_id thông qua bảng country

    // UPDATE address SET unit_number = 123, street_number = '4', address_line1 = 'Apartment 4A', address_line2 = '', city = 'San Francisco', region = 'CA', postal_code = '94105', country_id = (SELECT id FROM country WHERE country_name = 'United States' LIMIT 1) WHERE id = 505;

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
        const addressUpdate = await AddressModel.update(address, {
            where: {
                id: req.params.id
            }
        });
        if (!addressUpdate) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json("Update complete for address with id " + req.params.id);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the address."
        });
    }
}

exports.deleteAddress = async (req, res) => {
    // Truy vấn SQL để xóa địa chỉ mới với input là id
    // DELETE FROM address WHERE id = 505;
    try {
        const address = await AddressModel.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        await address.destroy();
        res.status(200).json({ message: 'Deleted successfully.' });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the address."
        });
    }
}