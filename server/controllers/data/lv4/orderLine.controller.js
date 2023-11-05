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

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllOrderLine = async (req, res) => {
    // Truy vấn SQL lấy tất cả các OrderLine từ bảng order_line, với các trường: id, order_id, product_item_id, quantity, price, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status
    // SELECT ol.id, ol.order_id, ol.product_item_id, ol.quantity, ol.price, p.name AS product_name, pc.category_name AS product_category, upm.provider AS payment_provider, upm.account_number AS payment_account, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status FROM order_line AS ol JOIN product_item AS pi ON ol.product_item_id = pi.id JOIN product AS p ON pi.product_id = p.id JOIN product_category AS pc ON p.category_id = pc.id JOIN shop_order AS so ON ol.order_id = so.id JOIN user_payment_method AS upm ON so.payment_method_id = upm.id JOIN address AS sa ON so.shipping_address = sa.id JOIN shipping_method AS sm ON so.shipping_method = sm.id JOIN order_status AS os ON so.order_status = os.id JOIN country AS c ON sa.country_id = c.id;
    try {
        const OrderLines = await OrderLineModel.findAll();
        const OrderLinePromise = OrderLines.map(async (OrderLine) => {
            const productItem = await productItemModel.findByPk(OrderLine.product_item_id);
            const product = await productModel.findByPk(productItem.product_id);
            const category = await productCategoryModel.findByPk(product.category_id);
            const shopOrder = await shopOrderModel.findByPk(OrderLine.order_id);
            const userPaymentMethod = await userPaymentMethodModel.findByPk(shopOrder.payment_method_id);
            const address = await AddressModel.findByPk(shopOrder.shipping_address);
            const country = await CountryModel.findByPk(address.country_id);
            const shippingMethod = await shippingMethodModel.findByPk(shopOrder.shipping_method);
            const orderStatus = await orderStatusModel.findByPk(shopOrder.order_status);
            return {
                ...OrderLine.dataValues,
                product_name: product.name,
                product_category: category.category_name,
                payment_provider: userPaymentMethod.provider,
                payment_account: userPaymentMethod.account,
                shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
                shipper: shippingMethod.name,
                shipping_fee: shippingMethod.price,
                order_status: orderStatus.status,
            }
        });
        // res.status(200).json(OrderLines);
        res.status(200).json(await Promise.all(OrderLinePromise));
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving OrderLine."
        });
    }
}
exports.getOrderLineByID = async (req, res) => {
    // Truy vấn SQL lấy 1 OrderLine theo id từ bảng order_line, với các trường: id, order_id, product_item_id, quantity, price, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status
    // SELECT ol.id, ol.order_id, ol.product_item_id, ol.quantity, ol.price, p.name AS product_name, pc.category_name AS product_category, upm.provider AS payment_provider, upm.account_number AS payment_account, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status FROM order_line AS ol JOIN product_item AS pi ON ol.product_item_id = pi.id JOIN product AS p ON pi.product_id = p.id JOIN product_category AS pc ON p.category_id = pc.id JOIN shop_order AS so ON ol.order_id = so.id JOIN user_payment_method AS upm ON so.payment_method_id = upm.id JOIN address AS sa ON so.shipping_address = sa.id JOIN shipping_method AS sm ON so.shipping_method = sm.id JOIN order_status AS os ON so.order_status = os.id JOIN country AS c ON sa.country_id = c.id WHERE ol.id = :id;
    try {
        const OrderLine = await OrderLineModel.findByPk(req.params.id);
        if (!OrderLine) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const productItem = await productItemModel.findByPk(OrderLine.product_item_id);
        const product = await productModel.findByPk(productItem.product_id);
        const category = await productCategoryModel.findByPk(product.category_id);
        const shopOrder = await shopOrderModel.findByPk(OrderLine.order_id);
        const userPaymentMethod = await userPaymentMethodModel.findByPk(shopOrder.payment_method_id);
        const address = await AddressModel.findByPk(shopOrder.shipping_address);
        const country = await CountryModel.findByPk(address.country_id);
        const shippingMethod = await shippingMethodModel.findByPk(shopOrder.shipping_method);
        const orderStatus = await orderStatusModel.findByPk(shopOrder.order_status);
        const OrderLinePromise = {
            ...OrderLine.dataValues,
            product_name: product.name,
            product_category: category.category_name,
            payment_provider: userPaymentMethod.provider,
            payment_account: userPaymentMethod.account,
            shipping_address: address.street_number + ' ' + address.address_line1 + ', ' + address.address_line2 + ', ' + address.city + ', ' + country.country_name,
            shipper: shippingMethod.name,
            shipping_fee: shippingMethod.price,
            order_status: orderStatus.status,
        }
        res.status(200).json(OrderLinePromise);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving OrderLine."
        }); 
    }
}

// It's not done yet
exports.createOrderLine = async (req, res) => {
    // Truy vấn SQL tạo 1 OrderLine mới trong bảng order_line, với các trường: id, order_id, product_item_id, quantity, price, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status; trong đó order_id lấy từ order_id, product_item_id lấy từ product_name, product_category lấy từ product_item_id; payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status lấy từ order_id; price lấy từ product_item_id; quantity lấy từ product_item_id

    // INSERT INTO order_line (id, order_id, product_item_id, quantity, price) VALUES (:id, :order_id, :product_item_id, :quantity, :price);
    try {
        const maxID = await OrderLineModel.max('id');
        const OrderLine = {
            id: maxID + 1,
            order_id: req.body.order_id,
            product_item_id: req.body.product_item_id,
            quantity: req.body.quantity,
            price: req.body.price,
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
        const newOrderLine = await OrderLineModel.create(OrderLine);
        console.log(">> Created OrderLine: " + JSON.stringify(newOrderLine, null, 4));
        res.status(200).json(newOrderLine);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the OrderLine."
        });
    }
}

exports.updateOrderLine = async (req, res) => {
    // Truy vấn SQL update 1 OrderLine theo id từ bảng order_line, với các trường: id, order_id, product_item_id, quantity, price, product_name, product_category, payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status; trong đó order_id lấy từ order_id, product_item_id lấy từ product_name, product_category lấy từ product_item_id; payment_provider, payment_account, shipping_address, shipper, shipping_fee, order_status lấy từ order_id; price lấy từ product_item_id; quantity lấy từ product_item_id
    // UPDATE order_line SET order_id = ( SELECT id FROM shop_order WHERE id = :order_id ), product_item_id = ( SELECT id FROM product_item WHERE id = :product_item_id LIMIT 1 ), quantity = :quantity, price = :price WHERE id = :id;
    try {
        const OrderLine = await OrderLineModel.findByPk(req.params.id);
        if (!OrderLine) {
            return res.status(404).json({
                message: "OrderLine not found with id " + req.params.id
            });
        }
        const newOrderLine = {
            order_id: req.body.order_id,
            product_item_id: req.body.product_item_id,
            quantity: req.body.quantity,
            price: req.body.price,
        }
        const updatedOrderLine = await OrderLineModel.update(newOrderLine, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedOrderLine);
    } catch ( err ) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the OrderLine."
        });
    }
}

// Truy vấn SQL để xóa 1 OrderLine theo id từ bảng order_line
// DELETE FROM order_line WHERE id = :id;
