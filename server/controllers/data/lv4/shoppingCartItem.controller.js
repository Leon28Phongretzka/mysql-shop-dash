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
    // Truy vấn SQL lấy tất cả các ShoppingCartItem từ bảng shopping_cart_item, với các trường: id, product_item_id, quantity, user_id, product_name, product_category, email_address
    // SELECT sci.id, sci.cart_id, sci.product_item_id, sci.quantity, sc.user_id, p.name AS product_name, pc.category_name AS product_category, u.email_address FROM shopping_cart_item AS sci JOIN product_item AS pi ON sci.product_item_id = pi.id
    // JOIN product AS p ON pi.product_id = p.id
    // JOIN product_category AS pc ON p.category_id = pc.id
    // JOIN shopping_cart AS sc ON sci.cart_id = sc.id
    // JOIN site_user AS u ON sc.user_id = u.id;
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
    // Truy vấn SQL lấy 1 ShoppingCartItem theo id từ bảng shopping_cart_item, với các trường: id, product_item_id, quantity, user_id, product_name, product_category, email_address
    // SELECT sci.id, sci.cart_id, sci.product_item_id, sci.quantity, sc.user_id, p.name AS product_name, pc.category_name AS product_category, u.email_address FROM shopping_cart_item AS sci JOIN product_item AS pi ON sci.product_item_id = pi.id
    // JOIN product AS p ON pi.product_id = p.id
    // JOIN product_category AS pc ON p.category_id = pc.id
    // JOIN shopping_cart AS sc ON sci.cart_id = sc.id
    // JOIN site_user AS u ON sc.user_id = u.id
    // WHERE sci.id = :id;
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
    // Truy vấn SQL tạo 1 ShoppingCartItem mới trong bảng shopping_cart_item, với các trường: id, product_item_id, quantity, cart_id
    // INSERT INTO shopping_cart_item (id, product_item_id, quantity, cart_id ) VALUES (:id, :product_item_id, :quantity, (SELECT id FROM shopping_cart WHERE user_id = :user_id LIMIT 1));
    try {
        const maxID = await ShoppingCartItemModel.max('id');
        const ShoppingCartItem = await ShoppingCartItemModel.create({
            id: maxID + 1,
            product_item_id: req.body.product_item_id,
            quantity: req.body.quantity,
            cart_id: req.body.cart_id,
        });
        res.status(200).json(ShoppingCartItem);
    } catch ( err ) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShoppingCartItem."
        })
    }
}

exports.updateShoppingCartItem = async (req, res) => {
    // Truy vấn SQL cập nhật 1 ShoppingCartItem theo id trong bảng shopping_cart_item, với các trường: id, product_item_id, quantity, cart_id;
    // UPDATE shopping_cart_item SET product_item_id = :product_item_id, quantity = :quantity, cart_id = :cart_id WHERE id = :id;
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
    // Truy vấn SQL xóa 1 ShoppingCartItem theo id trong bảng shopping_cart_item
    // DELETE FROM shopping_cart_item WHERE id = :id;
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
