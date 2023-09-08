const CountryModel = require('../../models/data_model/country.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await CountryModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving max id."
        });
    }
}

exports.getAllCountry = async (req, res) => {
    try {
        const countries = await CountryModel.findAll();
        res.status(200).json(countries);

    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving countries."
        });
    }
}