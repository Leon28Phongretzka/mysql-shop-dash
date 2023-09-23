const ShoppingCartItemModel = require('../../../models/data_model/lv4/shoppingCartItem.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllShoppingCartItem = async (req, res) => {
    try {
        const ShoppingCartItems = await ShoppingCartItemModel.findAll();
        res.status(200).json(ShoppingCartItems);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        });
    }
}
exports.getShoppingCartItemByID = async (req, res) => {
    try {
        const ShoppingCartItem = await ShoppingCartItemModel.findByPk(req.params.id);
        if (!ShoppingCartItem) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(ShoppingCartItem);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        }); 
    }
}

exports.createShoppingCartItem = async (req, res) => {
    try {
        const maxID = await ShoppingCartItemModel.max('id');
        const ShoppingCartItem = await ShoppingCartItemModel.create({
            id: maxID + 1,
            product_item_id: req.body.product_item_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
        });
        res.status(200).json(ShoppingCartItem);
    } catch ( err ) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        })
    }
}

exports.updateShoppingCartItem = async (req, res) => {
    try {
        const ShoppingCartItem = await ShoppingCartItemModel.update({
            product_item_id: req.body.product_item_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(ShoppingCartItem);
    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        })
    }
}

exports.deleteShoppingCartItem = async (req, res) => {
    try {
        const ShoppingCartItem = await ShoppingCartItemModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(ShoppingCartItem);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        })
    }
}
