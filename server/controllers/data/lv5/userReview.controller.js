const UserReviewModel = require('../../../models/data_model/lv5/userReview.model');

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

exports.createUserReview = async (req, res) => {
    try {
        const maxID = await UserReviewModel.max('id');
        const UserReview = {
            id: maxID + 1,
            user_id: req.body.user_id,
            ordered_product_id: req.body.ordered_product_id,
            rating: req.body.rating,
            comment: req.body.comment,
        }
        // find this order line is already exist or not
        // const orderLineExist = await OrderLineModel.findOne({
        //     where: {
        //         order_id: OrderLine.order_id,
        //         product_item_id: OrderLine.product_item_id,
        //     }
        // });
        // if(orderLineExist) {
        //     res.status(404).json({
        //         message: "OrderLine already exist with order_id " + OrderLine.order_id + " and product_item_id " + OrderLine.product_item_id
        //     })
        // }
        const newUserReview = await UserReviewModel.create(UserReview);
        console.log(">> Created UserReview: " + JSON.stringify(newUserReview, null, 4));
        res.status(200).json(newUserReview);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating UserReview."
        });
    }
}

exports.updateUserReview = async (req, res) => {
    try {
        const UserReview = await UserReviewModel.findByPk(req.params.id);
        if (!UserReview) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const updatedUserReview = {
            user_id: req.body.user_id,
            ordered_product_id: req.body.ordered_product_id,
            rating: req.body.rating,
            comment: req.body.comment,
        }
        const result = await UserReviewModel.update(updatedUserReview, {
            where: {
                id: req.params.id
            }
        });
        console.log(">> Updated UserReview: " + JSON.stringify(result, null, 4));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating UserReview."
        });
    }
}

exports.deleteUserReview = async (req, res) => {
    try {
        const UserReview = await UserReviewModel.findByPk(req.params.id);
        if (!UserReview) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const result = await UserReviewModel.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log(">> Deleted UserReview: " + JSON.stringify(result, null, 4));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting UserReview."
        });
    }
}
