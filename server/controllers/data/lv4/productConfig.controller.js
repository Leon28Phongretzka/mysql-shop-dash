const ProductConfigModel = require('../../../models/data_model/lv4/productConfig.model');
const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const variationOptionModel = require('../../../models/data_model/lv3/variationOption.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllProductConfig = async (req, res) => {
    try {
        const ProductConfigs = await ProductConfigModel.findAll();
        res.status(200).json(ProductConfigs);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ProductConfig."
        });
    }
}

exports.createProductConfig = async (req, res) => {
    try {
        const ProductConfig = {
            product_item_id: req.body.product_item_id,
            variation_option_id: req.body.variation_option_id,
        }
        const newProductConfig = await ProductConfigModel.create(ProductConfig);
        res.status(200).json(newProductConfig);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the ProductConfig."
        });
    }
}

exports.updateProductConfig = async (req, res) => {
    try {
        const ProductConfig = await ProductConfigModel.update(req.body, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json(ProductConfig);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the ProductConfig."
        });
    }
}

