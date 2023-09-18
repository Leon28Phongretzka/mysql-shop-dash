const UserReviewModel = require('../../../models/data_model/lv3/userReview.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserReview = async (req, res) => {
    try {
        const UserReviews = await UserReviewModel.findAll();
        res.status(200).json(UserReviews);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserReview."
        });
    }
}
exports.getUserReviewByID = async (req, res) => {
    try {
        const UserReview = await UserReviewModel.findByPk(req.params.id);
        if (!UserReview) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(UserReview);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserReview."
        }); 
    }
}
