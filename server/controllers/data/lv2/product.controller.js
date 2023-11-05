const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");


exports.getMaxID = async (req, res) => {
    try {
        const maxID = await productModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product."
        });
    }
}

exports.getAllProduct = async (req, res) => {
    // Truy vấn SQL để lấy tất cả sản phẩm và thay thế category_id bằng tên danh mục sản phẩm với category_name được lấy từ bảng product_category thông qua category_id
    // SELECT product.*, product_category.category_name FROM product INNER JOIN product_category ON product.category_id = product_category.id ORDER BY id;
    try {
        const products = await productModel.findAll();
        const productPromises = products.map(async (product) => {
            const category = await productCategoryModel.findByPk(product.category_id);
            delete product.dataValues.category_id;
            return { ...product.dataValues, category_name: category.category_name };
        }, Promise.resolve());
        const productWithCategory = await Promise.all(productPromises);
        res.status(200).json(productWithCategory);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving products."
        });
    }
}

exports.getProductById = async (req, res) => {
    // Truy vấn SQL để lấy sản phẩm với id được nhập và thay thế category_id bằng tên danh mục sản phẩm với category_name được lấy từ bảng product_category thông qua category_id
    // SELECT product.*, product_category.category_name FROM product INNER JOIN product_category ON product.category_id = product_category.id WHERE product.id = :id;
    try {
        const product = await productModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found with id " + req.params.id
            });
        }
        const category = await productCategoryModel.findByPk(product.category_id);
        delete product.dataValues.category_id;
        const productWithCategory = { ...product.dataValues, category_name: category.category_name };
        res.status(200).json(productWithCategory);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product."
        });
    }
}

exports.createProduct = async (req, res) => {
    // Truy vấn SQL để tạo sản phẩm mới với id là chỉ sổ tăng tự động, category_id được lấy từ bảng product_category thông qua category_name
    // INSERT INTO product (id, name, description, product_image, category_id)
    // SELECT :id, :name, :description, :product_image, pc.id
    // FROM product_category pc
    // JOIN product p ON pc.category_name = :category_name
    // LIMIT 1;
    const maxID = await productModel.max('id');
    const category_id = await productCategoryModel.findOne({
        where: {
            category_name: req.body.category_name
        }
    })
    try {
        const product = {
            id: maxID + 1,
            name: req.body.name,
            description: req.body.description,
            product_image: req.body.product_image,
            category_id: category_id.id
        }
        const newProduct = await productModel.create(product);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the product."
        });
    }
}

exports.updateProduct = async (req, res) => {
    // Truy vấn SQL để sửa sản phẩm với id là chỉ sổ tăng tự động, category_id được lấy từ bảng product_category thông qua category_name, sử dụng UPDATE và JOIN

    // UPDATE product p JOIN product_category pc ON p.category_id = pc.id SET p.name = :name, p.description = :description, p.product_image = :product_image, p.category_id = pc.id WHERE p.id = :id;

    const category_id = await productCategoryModel.findOne({
        where: {
            category_name: req.body.category_name
        }
    })
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            product_image: req.body.product_image,
            category_id: category_id.id
        }
        const productUpdate = await productModel.update(product, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json("Update complete");
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the product."
        });
    }
}

exports.deleteProduct = async (req, res) => {
    // Truy vấn SQL để xóa sản phẩm với id được nhập

    // DELETE FROM product WHERE id = :id;
    try {
        const product = await productModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found with id " + req.params.id
            });
        }
        const productDelete = await productModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json("Delete complete " + productDelete + " product");
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the product."
        });
    }
}