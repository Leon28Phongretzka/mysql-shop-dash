const OrderLineModel = require('../../../models/data_model/lv4/orderLine.model');
const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllOrderLine = async (req, res) => {
    try {
        const OrderLines = await OrderLineModel.findAll();
        res.status(200).json(OrderLines);

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
        res.status(200).json(OrderLine);
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
