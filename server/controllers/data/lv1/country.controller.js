const CountryModel = require('../../../models/data_model/lv1/country.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

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

exports.getCountryById = async (req, res) => {
    try {
        const country = await CountryModel.findByPk(req.params.id);
        if (!country) {
            return res.status(404).json({
                message: "Country not found with id " + req.params.id
            });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving country."
        });
    }
}

exports.addCountry = async (req, res) => {
    try {
        const country_id = await CountryModel.findOne({
            where: {
                country_name: req.body.country_name
            }
        })
        if(country_id) {
            return res.status(400).json({
                message: "Country already exists."
            });
        }
        const maxID = await CountryModel.max('id');
        const country = {
            id: maxID + 1,
            country_name: req.body.country_name
        }
        const createdCountry = await CountryModel.create(country);
        console.log(country.id);
        res.status(201).json(createdCountry);

    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating country."
        });
    }
}

// Need to fix this function to delete all duplicate countries

// exports.deleteAllDuplicateCountry = async ( req, res ) => {
//     try {
//         const countries = await CountryModel.findAll();
//         const countryNames = [];
//         countries.forEach(country => {
//             countryNames.push(country.country_name);
//         });
//         const duplicateCountryNames = countryNames.filter((countryName, index) => {
//             return countryNames.indexOf(countryName) !== index;
//         });
//         const duplicateCountries = await CountryModel.findAll({
//             where: {
//                 country_name: {
//                     [Op.in]: duplicateCountryNames
//                 }
//             }
//         });
//         duplicateCountries.forEach(async (duplicateCountry) => {
//             await duplicateCountry.destroy();
//         });
//         res.status(200).json({
//             message: "Deleted all duplicate countries."
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: err.message || "Some error occurred while retrieving country."
//         })
//     }
// }