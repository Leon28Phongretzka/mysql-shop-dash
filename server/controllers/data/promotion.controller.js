const PromotionModel = require('../../models/data_model/promotion.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await PromotionModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving max id."
        });
    }
}

exports.getAllPromotion = async (req, res) => {
    try {
        const promotions = await PromotionModel.findAll();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving promotions."
        });
    }
}

exports.getExpriedPromotion = async (req, res) => {
    try {
        const currentDate = new Date();
        const promotions = await PromotionModel.findAll({
            where: {
                end_date: {
                    [Op.lt]: currentDate
                }
            }
        });
        res.status(200).json(promotions);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving promotions."
        });
    }
}