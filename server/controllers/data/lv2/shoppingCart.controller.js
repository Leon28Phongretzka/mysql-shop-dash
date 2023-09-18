const shoppingCartModel = require('../../../models/data_model/lv2/shoppingCart.model');
const UserModel = require('../../../models/auth_model/user.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");
const User = require('../../../models/auth_model/user.model');

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

exports.getShoppingCartsByUserID = async (req, res) => {
    try {
        const Carts = await shoppingCartModel.findAll({
            where: {
                userID: req.params.userID
            }
        });
        res.status(200).json(Carts);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Carts."
        });
    }
}

exports.createShoppingCart = async (req, res) => {
    try {
        const user_id = await UserModel.findOne({
            where: {
                email_address: req.body.email
            }
        });
        console.log(user_id);
        const maxID = await shoppingCartModel.max('id');
        const cart = {
            id: maxID + 1,
            user_id: user_id.id,
            
        }
        const newCart = await shoppingCartModel.create(cart);
        res.status(200).json(newCart);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Cart."
        });
    }
}

exports.updateShoppingCart = async (req, res) => {
    try {
        const cart = await shoppingCartModel.findOne({
            where: {
                id: req.params.id
            }
        });
        if (cart) {
            const updatedCart = await cart.update(req.body);
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json('Cart not found');
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the Cart."
        });
    }
}