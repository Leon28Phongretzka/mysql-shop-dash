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

exports.createProductItem = async (req, res) => {
    try {
        const product_id = await productModel.findOne({
            where: {
                name: req.body.product_name
            }
        })
        const maxID = await productItemModel.max('id');
        const ProductItem = {
            id: maxID + 1,
            product_id: product_id.id,
            SKU: req.body.SKU,
            quantity_in_stock: req.body.quantity_in_stock,
            price: req.body.price,
        }
        const newProductItem = await productItemModel.create(ProductItem);
        res.status(200).json(newProductItem);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the ProductItem."
        });
    }
}

exports.updateProductItem = async (req, res) => {
    try {
        const product_id = await productModel.findOne({
            where: {
                name: req.body.product_name
            }
        })
        const ProductItem = {
            product_id: product_id.id,
            SKU: req.body.SKU,
            quantity_in_stock: req.body.quantity_in_stock,
            price: req.body.price,
        }
        const updatedProductItem = await productItemModel.update(ProductItem, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedProductItem); 
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the ProductItem."
        });
    }
}

exports.deleteProductItem = async (req, res) => {
    try {
        const deletedProductItem = await productItemModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedProductItem);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the ProductItem."
        });
    }
}
