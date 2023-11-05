const PromotionModel = require('../../../models/data_model/lv1/promotion.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
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
    // SQL script to get all promotion
    // SELECT * FROM promotions;
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

exports.createPromotion = async( req, res) => {
    try {
        const maxID = await PromotionModel.max('id');
        const promotion = {
            id: maxID + 1,
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            discount: req.body.discount,
        }
        const newPromotion = await PromotionModel.create(promotion);
        res.status(200).json(newPromotion);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating promotion."
        });
    }
}

// exports.deleteExpiredPromotion = async (req, res) => {
//     try {
//         const currentDate = new Date();
//         const promotions = await PromotionModel.destroy({
//             where: {
//                 end_date: {
//                     [Op.lt]: currentDate
//                 }
//             }
//         });
//         res.status(200).json(promotions);
//     } catch (err) {
//         res.status(500).json({
//             message: err.message || "Some error occurred while retrieving promotions."
//         });
//     }
// }

exports.deletePromotion = async (req, res) => {
    try {
        const promotion = await PromotionModel.findByPk(req.params.id);
        if (!promotion) {
            return res.status(404).json({
                message: "Promotion not found with id " + req.params.id
            });
        }
        await promotion.destroy();
        res.status(204).json({ message: "Promotion deleted successfully!" });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting promotion."
        });
    }
}

