const shoppingCartModel = require('../../../models/data_model/lv2/shoppingCart.model');
const UserModel = require('../../../models/auth_model/user.model');
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

exports.getAllShoppingCarts = async (req, res) => {
    try {
        const Carts = await shoppingCartModel.findAll();
        res.status(200).json(Carts);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Carts."
        });
    }
}