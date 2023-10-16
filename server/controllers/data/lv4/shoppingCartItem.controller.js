const ShoppingCartItemModel = require('../../../models/data_model/lv4/shoppingCartItem.model');
const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');
const shoppingCartModel = require('../../../models/data_model/lv2/shoppingCart.model');
const UserModel = require('../../../models/auth_model/user.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllShoppingCartItem = async (req, res) => {
    try {
        const ShoppingCartItems = await ShoppingCartItemModel.findAll();
        const ShoppingCartItemPromise = ShoppingCartItems.map(async (ShoppingCartItem) => {
            const productItem = await productItemModel.findByPk(ShoppingCartItem.product_item_id);
            const product = await productModel.findByPk(productItem.product_id);
            const category = await productCategoryModel.findByPk(product.category_id);
            const shoppingCart = await shoppingCartModel.findByPk(ShoppingCartItem.cart_id);
            const user = await UserModel.findByPk(shoppingCart.user_id);
            return {
                ...ShoppingCartItem.dataValues,
                product_name: product.name,
                product_category: category.category_name,
                email_address: user.email_address,
            }
        });
        // res.status(200).json(ShoppingCartItems);
        res.status(200).json(await Promise.all(ShoppingCartItemPromise));
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
        const productItem = await productItemModel.findByPk(ShoppingCartItem.product_item_id);
        const product = await productModel.findByPk(productItem.product_id);
        const category = await productCategoryModel.findByPk(product.category_id);
        const shoppingCart = await shoppingCartModel.findByPk(ShoppingCartItem.cart_id);
        const user = await UserModel.findByPk(shoppingCart.user_id);
        
        const ShoppingCartItemWithProduct = {
            ...ShoppingCartItem.dataValues,
            product_name: product.name,
            product_category: category.category_name,
            email_address: user.email_address,
        }
        
        res.status(200).json(ShoppingCartItemWithProduct);
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
