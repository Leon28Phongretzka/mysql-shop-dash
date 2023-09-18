const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllProductItem = async (req, res) => {
    try {
        const productItems = await productItemModel.findAll();
        res.status(200).json(productItems);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving productItems."
        });
    }
}
exports.getProductItemByID = async (req, res) => {
    try {
        const ProductItem = await productItemModel.findByPk(req.params.id);
        if (!ProductItem) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        res.status(200).json(ProductItem);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ProductItem."
        }); 
    }
}
