const ProductCategoryModel = require('../../models/data_model/productCategory.model');
const jwtConfig = require('../../config/jwt.config');
const jwtUtil = require('../../utils/jwt.util');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await ProductCategoryModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving max id."
        });
    }
}

exports.getAllProductCategory = async (req, res) => {
    try {
        const productCategories = await ProductCategoryModel.findAll();
        res.status(200).json(productCategories);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product categories."
        });
    }
}

exports.getProductCategoryById = async (req, res) => {
    try {
        const productCategory = await ProductCategoryModel.findByPk(req.params.id);
        const maxID = await ProductCategoryModel.max('id');
        if (!productCategory) {
            return res.status(404).json({
                message: "Product category not found with id " + req.params.id + ", our max ID is: " + maxID
            });
        }
        res.status(200).json(productCategory);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product category."
        });
    }
}

exports.createProductCategory = async (req, res) => {
    try {
        const maxID = await ProductCategoryModel.max('id');
        const productCategory = {
            id: maxID + 1,
            category_name: req.body.category_name
        }
        const createdProductCategory = await ProductCategoryModel.create(productCategory);
        const existingCategory = await ProductCategoryModel.findOne({ where: { category_name: req.body.category_name } });
        if (existingCategory) {
            return res.status(409).json({
                message: "Product category already exists."
            });
        }
        else if (createdProductCategory) {
            res.status(201).json(createdProductCategory);
        }
        else if(createdProductCategory === null) {
            res.status(409).json({
                message: "Product category is null."
            });
        }
        else {
            res.status(500).json({
                message: "Some error occurred while creating the product category."
            });
        }   
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the product category."
        });
    }
}

exports.updateProductCategory = async (req, res) => {
    try {
        const productCategory = await ProductCategoryModel.findByPk(req.params.id);
        if (!productCategory) {
            return res.status(404).json({
                message: "Product category not found with id " + req.params.id
            });
        }
        const updatedProductCategory = await productCategory.update(req.body);
        res.status(200).json(updatedProductCategory);
    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the product category."
        });
    }
}

exports.deleteProductCategory = async (req, res) => {
    try {
        const productCategory = await ProductCategoryModel.findByPk(req.params.id);
        if (!productCategory) {
            return res.status(404).json({
                message: "Product category not found with id " + req.params.id
            });
        }
        await productCategory.destroy();
        res.status(204).json({ message: "Product category deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the product category."
        });
    }
}