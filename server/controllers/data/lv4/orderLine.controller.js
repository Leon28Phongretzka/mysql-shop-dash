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
