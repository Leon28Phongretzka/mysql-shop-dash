const Variation = require("../../../models/data_model/lv2/variation.model");
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");


exports.getAllVariation = async (req, res) => {
    try {
        const Variations = await Variation.findAll();
        res.status(200).json(Variations)
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Variation."
        });
        //console.log(err);
    }
}

exports.getVariationByID = async (req, res) => {
    try {
        const Variations = await Variation.findByPk(req.params.id);
        if (!Variations) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(Variations);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Variation."
        }); 
    }
}
