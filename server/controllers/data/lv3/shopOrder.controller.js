const ShopOrderModel = require('../../../models/data_model/lv3/shopOrder.model');
const userPaymentMethodModel = require('../../../models/data_model/lv2/userPaymentMethod.model');
const AddressModel = require('../../../models/data_model/lv2/address.model');
const shippingMethodModel = require('../../../models/data_model/lv1/shippingMethod.model');
const orderStatusModel = require('../../../models/data_model/lv1/orderStatus.model');
const CountryModel = require('../../../models/data_model/lv1/country.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllShopOrder = async (req, res) => {
    // Truy vấn SQL lấy tất cả các ShopOrder từ bảng shop_order, với các trường: id, user_id, order_date, order_total, order_status, payment_method_id, shipping_address, shipping_method, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status
    // SELECT so.id, so.user_id, so.order_date, so.order_total, so.payment_method_id, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, so.shipping_method, upm.provider, upm.account_number, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status
    // FROM shop_order AS so
    // JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
    // JOIN address AS sa ON so.shipping_address = sa.id
    // JOIN shipping_method AS sm ON so.shipping_method = sm.id
    // JOIN order_status AS os ON so.order_status = os.id
    // JOIN country AS c ON sa.country_id = c.id;
    try {
        const ShopOrders = await ShopOrderModel.findAll();
        const ShopOrderPromise = ShopOrders.map(async (ShopOrder) => {
            const userPaymentMethod = await userPaymentMethodModel.findByPk(ShopOrder.payment_method_id);
            const address = await AddressModel.findByPk(ShopOrder.shipping_address);
            const country = await CountryModel.findByPk(address.country_id);
            const shippingMethod = await shippingMethodModel.findByPk(ShopOrder.shipping_method);
            const orderStatus = await orderStatusModel.findByPk(ShopOrder.order_status);
            return {
                ...ShopOrder.dataValues,
                payment_provider: userPaymentMethod.provider,
                payment_account: userPaymentMethod.account,
                shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
                shipper: shippingMethod.name,
                shipping_fee: shippingMethod.price,
                order_status: orderStatus.status,
            }
        });
        res.status(200).json(await Promise.all(ShopOrderPromise));

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        });
    }
}

exports.getShopOrderByID = async (req, res) => {
    // Truy vấn SQL lấy 1 ShopOrder theo id từ bảng shop_order, với các trường: id, user_id, order_date, order_total, order_status, payment_method_id, shipping_address, shipping_method, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status
    // SELECT so.id, so.user_id, so.order_date, so.order_total, so.payment_method_id, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, so.shipping_method, upm.provider, upm.account_number, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status
    // FROM shop_order AS so
    // JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
    // JOIN address AS sa ON so.shipping_address = sa.id
    // JOIN shipping_method AS sm ON so.shipping_method = sm.id
    // JOIN order_status AS os ON so.order_status = os.id
    // JOIN country AS c ON sa.country_id = c.id WHERE so.id = :id;
    try {
        const ShopOrder = await ShopOrderModel.findByPk(req.params.id);
        if (!ShopOrder) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }

        const userPaymentMethod = await userPaymentMethodModel.findByPk(ShopOrder.payment_method_id);
        const address = await AddressModel.findByPk(ShopOrder.shipping_address);
        const country = await CountryModel.findByPk(address.country_id);
        const shippingMethod = await shippingMethodModel.findByPk(ShopOrder.shipping_method);
        const orderStatus = await orderStatusModel.findByPk(ShopOrder.order_status);

        const ShopOrderPromise = {
            ...ShopOrder.dataValues,
            payment_provider: userPaymentMethod.provider,
            payment_account: userPaymentMethod.account,
            shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
            shipper: shippingMethod.name,
            shipping_fee: shippingMethod.price,
            order_status: orderStatus.status,
        }

        res.status(200).json(ShopOrderPromise);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrderBy."
        }); 
    }
}

exports.createShopOrder = async (req, res) => {
    // Truy vấn SQL để tạo ShopOrder mới, lấy payment_method_id từ user_payment_method thông qua provider và account, lấy shipping_address từ address thông qua street_number, address_line1, address_line2, city, country_id, lấy shipping_method từ shipping_method thông qua name, lấy order_status từ order_status thông qua status, sử dụng INSERT
    // INSERT INTO shop_order (id, user_id, order_date, order_total, order_status, payment_method_id, shipping_address, shipping_method) VALUES (:id, :user_id, :order_date, :order_total, :order_status, :payment_method_id, :shipping_address, :shipping_method);
    try {
        const maxID = await ShopOrderModel.max('id');
        const ShopOrder = await ShopOrderModel.create({
            id: maxID + 1,
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            order_total: req.body.order_total,
            order_status: req.body.order_status,
            payment_method_id: req.body.payment_method_id,
            shipping_address: req.body.shipping_address,
            shipping_method: req.body.shipping_method,
        });
        res.status(200).json(ShopOrder);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        })
    }
}

exports.updateShopOrder = async (req, res) => {
    // Truy vấn SQL để update ShopOrder, lấy payment_method_id từ user_payment_method thông qua provider và account, lấy shipping_address từ address thông qua street_number, address_line1, address_line2, city, country_id, lấy shipping_method từ shipping_method thông qua name, lấy order_status từ order_status thông qua status, sử dụng UPDATE
    // UPDATE shop_order SET user_id = :user_id, order_date = :order_date, order_total = :order_total, order_status = :order_status, payment_method_id = :payment_method_id, shipping_address = :shipping_address, shipping_method = :shipping_method WHERE id = :id;
    try {
        const ShopOrder = await ShopOrderModel.update({
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            order_total: req.body.order_total,
            order_status: req.body.order_status,
            payment_method_id: req.body.payment_method_id,
            shipping_address: req.body.shipping_address,
            shipping_method: req.body.shipping_method,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(ShopOrder);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ShopOrder."
        })
    }
}
