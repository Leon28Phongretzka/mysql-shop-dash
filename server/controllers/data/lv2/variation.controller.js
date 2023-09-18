const VariationModel = require("../../../models/data_model/lv2/variation.model");
const productCategoryModel = require("../../../models/data_model/lv1/productCategory.model");
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");


exports.getAllVariation = async (req, res) => {
    try {
        const Variations = await VariationModel.findAll();
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
        const Variations = await VariationModel.findByPk(req.params.id);
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

exports.createVariation = async (req, res) => {
    try {
        const category_id = await productCategoryModel.findOne({
            where: {
                category_name : req.body.category_name
            }
        });
        // console.log(category_id);
        const maxID = await VariationModel.max('id');
        const Variations = {
            id: maxID + 1,
            category_id: category_id.id,
            name: req.body.name,
        }
        console.log(Variations);
        const newVariation = await VariationModel.create(Variations);
        res.status(200).json(newVariation);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Variation."
        });
    }
}

exports.updateVariation = async (req, res) => {
    try {
        const Variations = await VariationModel.findByPk(req.params.id);
        if (!Variations) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const category_id = await productCategoryModel.findOne({
            where: {
                category_name : req.body.category_name
            }
        });
        const newVariation = {
            category_id: category_id.id,
            name: req.body.name,
        }
        const updatedVariation = await VariationModel.update(newVariation, {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedVariation);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Variation."
        }); 
    }
}

exports.deleteVariation = async (req, res) => {
    try {
        const Variations = await VariationModel.findByPk(req.params.id);
        if (!Variations) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        await Variations.destroy();
        res.status(200).json({ message: 'Deleted successfully.' });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Variation."
        }); 
    }
}