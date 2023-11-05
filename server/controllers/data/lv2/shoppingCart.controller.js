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
    // Truy vấn SQL để lấy tất cả shopping_cart và thay thế user_id bằng email_address với email_address được lấy từ bảng user thông qua user_id

    // SELECT shopping_cart.*, user.email_address FROM shopping_cart INNER JOIN user ON shopping_cart.user_id = user.id ORDER BY id;
    try {
        const Carts = await shoppingCartModel.findAll();
        const cartPromises = Carts.map(async (cart) => {
            const user = await UserModel.findByPk(cart.user_id);
            // delete cart.dataValues.user_id;
            return { ...cart.dataValues, email_address: user.email_address };
        });
        res.status(200).json(await Promise.all(cartPromises));
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Carts."
        });
    }
}

exports.getShoppingCartsByUserID = async (req, res) => {
    // Truy vấn SQL để lấy shopping_cart tương ứng và thay thế user_id bằng email_address với email_address được lấy từ bảng site_user thông qua user_id

    // SELECT shopping_cart.*, site_user.email_address FROM shopping_cart INNER JOIN site_user ON shopping_cart.user_id = site_user.id WHERE shopping_cart.user_id = :id LIMIT 1;

    try {
        const Cart = await shoppingCartModel.findAll({
            where: {
                user_id: req.params.id
            }
        });
        const cartPromises = Cart.map(async (cart) => {
            const user = await UserModel.findByPk(cart.user_id);
            // delete cart.dataValues.user_id;
            return { ...cart.dataValues, email_address: user.email_address };
        });
        // delete Cart.dataValues.user_id;
        res.status(200).json(await Promise.all(cartPromises));
        // res.status(200).json(Cart);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Carts."
        });
    }
}

exports.createShoppingCart = async (req, res) => {
    // Truy vấn SQL để tạo shopping_cart mới với id là chỉ sổ tăng tự động, user_id được lấy từ bảng site_user thông qua email_address

    // INSERT INTO shopping_cart (id, user_id) SELECT :id, su.user_id FROM site_user su WHERE su.email_address = :email_address LIMIT 1;
    // When input - the email address of the user is in "<email>"
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
    // Truy vấn SQL để cập nhật shopping_cart với id được nhập và thay thế user_id bằng email_address với email_address được lấy từ bảng site_user thông qua user_id

    // UPDATE shopping_cart SET user_id = (SELECT su.user_id FROM site_user su WHERE su.email_address = :email_address LIMIT 1) WHERE id = :id;
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

exports.deleteShoppingCart = async (req, res) => {
    try {
        const cart = await shoppingCartModel.findOne({
            where: {
                id: req.params.id
            }
        });
        if (cart) {
            await cart.destroy();
            res.status(200).json('Cart deleted');
        } else {
            res.status(404).json('Cart not found');
        }
    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the Cart."
        });
    }
}