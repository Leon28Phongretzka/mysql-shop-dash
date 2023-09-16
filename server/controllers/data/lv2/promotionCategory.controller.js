const PromotionCategoryModel = require('../../../models/data_model/lv2/promotionCategory.model');
const PromotionModel = require('../../../models/data_model/lv1/promotion.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllPromotionCategory = async (req, res) => {
    try {
        const promotionCategories = await PromotionCategoryModel.findAll();
        res.status(200).json(promotionCategories);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving promotionCategories."
        });
    }
}

exports.getPromotionCategoryById = async (req, res) => {
    try {
        const promotionCategory = await PromotionCategoryModel.findByPk(req.params.id);
        if (!promotionCategory) {
            return res.status(404).json({
                message: "PromotionCategory not found with id " + req.params.id
            });
        }
        res.status(200).json(promotionCategory);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving promotionCategory."
        });
    }
}

exports.createPromotionCategory = async (req, res) => {
    const promotion_id = await PromotionModel.findOne({
        where: {
            name: req.body.promotion_name
        }
    })
    try {
        const promotionCategory = await PromotionCategoryModel.create({
            category_id: req.body.category_id,
            promotion_id: promotion_id.id
        });
        console.log(">> Created promotionCategory: " + JSON.stringify(promotionCategory, null, 4));
        res.status(201).json(promotionCategory);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the promotionCategory."
        });
    }
}

exports.updatePromotionCategory = async (req, res) => {
    try {
        const promotionCategory = await PromotionCategoryModel.findByPk(req.params.id);
        if (!promotionCategory) {
            return res.status(404).json({
                message: "PromotionCategory not found with id " + req.params.id
            });
        }
        const promotion_id = await PromotionModel.findOne({
            where: {
                name: req.body.promotion_name
            }
        })
        const updatedPromotionCategory = await PromotionCategoryModel.update({
            category_id: req.body.category_id,
            promotion_id: promotion_id.id
        }, {
            where: {
                id: req.params.id
            }
        });
        console.log(">> Updated promotionCategory: " + JSON.stringify(updatedPromotionCategory, null, 4));
        res.status(200).json(updatedPromotionCategory);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the promotionCategory."
        });
    }
}

exports.deletePromotionCategory = async (req, res) => {
    try {
        const promotionCategory = await PromotionCategoryModel.findByPk(req.params.id);
        if (!promotionCategory) {
            return res.status(404).json({
                message: "PromotionCategory not found with id " + req.params.id
            });
        }
        await promotionCategory.destroy();
        res.status(200).json({ message: 'Deleted successfully.' });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting promotionCategory."
        });
    }
}

