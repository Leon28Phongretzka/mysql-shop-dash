const UserReviewModel = require('../../../models/data_model/lv5/userReview.model');
const OrderLineModel = require('../../../models/data_model/lv4/orderLine.model');
const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');
const shopOrderModel = require('../../../models/data_model/lv3/shopOrder.model');
const userPaymentMethodModel = require('../../../models/data_model/lv2/userPaymentMethod.model');
const AddressModel = require('../../../models/data_model/lv2/address.model');
const shippingMethodModel = require('../../../models/data_model/lv1/shippingMethod.model');
const orderStatusModel = require('../../../models/data_model/lv1/orderStatus.model');
const CountryModel = require('../../../models/data_model/lv1/country.model');
const UserModel = require('../../../models/auth_model/user.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserReview = async (req, res) => {
    // Truy vấn SQL lấy tất cả các UserReview từ bảng user_review, với các trường: id, user_id, ordered_product_id, rating, comment, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status, email_address

    // SELECT
//     ur.id,
//     ur.user_id,
//     ur.ordered_product_id,
//     ur.rating,
//     ur.comment,
//     p.name AS product_name,
//     pc.category_name AS product_category,
//     upm.provider AS payment_provider,
//     upm.account AS payment_account,
//     CONCAT(a.street_number, ' ', a.address_line1, ', ', a.address_line2, ', ', a.city, ', ', c.country_name) AS shipping_address,
//     sm.name AS shipper,
//     sm.price AS shipping_fee,
//     os.status AS order_status,
//     u.email_address AS email_address
//     FROM user_review AS ur
//     LEFT JOIN order_line AS ol ON ur.ordered_product_id = ol.id
//     LEFT JOIN product_item AS pi ON ol.product_item_id = pi.id
//     LEFT JOIN product AS p ON pi.product_id = p.id
//     LEFT JOIN product_category AS pc ON p.category_id = pc.id
//     LEFT JOIN shop_order AS so ON ol.order_id = so.id
//     LEFT JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
//     LEFT JOIN address AS a ON so.shipping_address = a.id
//     LEFT JOIN country AS c ON a.country_id = c.id
//     LEFT JOIN shipping_method AS sm ON so.shipping_method = sm.id
//     LEFT JOIN order_status AS os ON so.order_status = os.id
//     LEFT JOIN user AS u ON ur.user_id = u.id;
    try {
        const UserReviews = await UserReviewModel.findAll();
        const UserReviewPromise = UserReviews.map(async (UserReview) => {
            const orderLine = await OrderLineModel.findByPk(UserReview.ordered_product_id);
            const productItem = await productItemModel.findByPk(orderLine.product_item_id);
            const product = await productModel.findByPk(productItem.product_id);
            const category = await productCategoryModel.findByPk(product.category_id);
            const shopOrder = await shopOrderModel.findByPk(orderLine.order_id);
            const userPaymentMethod = await userPaymentMethodModel.findByPk(shopOrder.payment_method_id);
            const address = await AddressModel.findByPk(shopOrder.shipping_address);
            const country = await CountryModel.findByPk(address.country_id);
            const shippingMethod = await shippingMethodModel.findByPk(shopOrder.shipping_method);
            const orderStatus = await orderStatusModel.findByPk(shopOrder.order_status);
            const user = await UserModel.findByPk(UserReview.user_id);
            return {
                ...UserReview.dataValues,
                product_name: product.name,
                product_category: category.category_name,
                payment_provider: userPaymentMethod.provider,
                payment_account: userPaymentMethod.account,
                shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
                shipper: shippingMethod.name,
                shipping_fee: shippingMethod.price,
                order_status: orderStatus.status,
                email_address: user.email_address,
            }
        });
        // res.status(200).json(UserReviews);
        res.status(200).json(await Promise.all(UserReviewPromise));

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserReview."
        });
    }
}
exports.getUserReviewByID = async (req, res) => {
    // Truy vấn SQL lấy UserReview từ bảng user_review, với các trường: id, user_id, ordered_product_id, rating, comment, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status, email_address
    // SELECT
    // ur.id,
    // ur.user_id,
    // ur.ordered_product_id,
    // ur.rating,
    // ur.comment,
    // p.name AS product_name,
    // pc.category_name AS product_category,
    // upm.provider AS payment_provider,
    // upm.account_number AS payment_account,
    // CONCAT(a.street_number, ' ', a.address_line1, ', ', a.address_line2, ', ', a.city, ', ', c.country_name) AS shipping_address,
    // sm.name AS shipper,
    // sm.price AS shipping_fee,
    // os.status AS order_status,
    // u.email_address AS email_address
    // FROM user_review AS ur
    // LEFT JOIN order_line AS ol ON ur.ordered_product_id = ol.id
    // LEFT JOIN product_item AS pi ON ol.product_item_id = pi.id
    // LEFT JOIN product AS p ON pi.product_id = p.id
    // LEFT JOIN product_category AS pc ON p.category_id = pc.id
    // LEFT JOIN shop_order AS so ON ol.order_id = so.id
    // LEFT JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
    // LEFT JOIN address AS a ON so.shipping_address = a.id
    // LEFT JOIN country AS c ON a.country_id = c.id
    // LEFT JOIN shipping_method AS sm ON so.shipping_method = sm.id
    // LEFT JOIN order_status AS os ON so.order_status = os.id
    // LEFT JOIN site_user AS u ON ur.user_id = u.id
    // WHERE ur.id = :id;
    try {
        const UserReview = await UserReviewModel.findByPk(req.params.id);
        if (!UserReview) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const orderLine = await OrderLineModel.findByPk(UserReview.ordered_product_id);
        const productItem = await productItemModel.findByPk(orderLine.product_item_id);
        const product = await productModel.findByPk(productItem.product_id);
        const category = await productCategoryModel.findByPk(product.category_id);
        const shopOrder = await shopOrderModel.findByPk(orderLine.order_id);
        const userPaymentMethod = await userPaymentMethodModel.findByPk(shopOrder.payment_method_id);
        const address = await AddressModel.findByPk(shopOrder.shipping_address);
        const country = await CountryModel.findByPk(address.country_id);
        const shippingMethod = await shippingMethodModel.findByPk(shopOrder.shipping_method);
        const orderStatus = await orderStatusModel.findByPk(shopOrder.order_status);
        const user = await UserModel.findByPk(UserReview.user_id);

        const UserReviewPromise = {
            ...UserReview.dataValues,
                product_name: product.name,
                product_category: category.category_name,
                payment_provider: userPaymentMethod.provider,
                payment_account: userPaymentMethod.account,
                shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
                shipper: shippingMethod.name,
                shipping_fee: shippingMethod.price,
                order_status: orderStatus.status,
                email_address: user.email_address,
        }
        // res.status(200).json(UserReview);
        res.status(200).json(UserReviewPromise);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving UserReview."
        }); 
    }
}

exports.createUserReview = async (req, res) => {
    // Truy vấn SQL tạo mới 1 UserReview từ bảng user_review, với các trường: id, user_id, ordered_product_id, rating, comment, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status, email_address
    // INSERT INTO user_review (id, user_id, ordered_product_id, rating, comment) VALUES (:id, :user_id, :ordered_product_id, :rating, :comment);
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
    // Truy vấn SQL cập nhật 1 UserReview từ bảng user_review, với các trường: id, user_id, ordered_product_id, rating, comment, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status, email_address
    // UPDATE user_review SET user_id = :user_id, ordered_product_id = :ordered_product_id, rating = :rating, comment = :comment WHERE id = :id;
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
    // Truy vấn SQL xóa 1 UserReview từ bảng user_review, với các trường: id, user_id, ordered_product_id, rating, comment, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status, email_address
    // DELETE FROM user_review WHERE id = :id;
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
