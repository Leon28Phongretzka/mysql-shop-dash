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
