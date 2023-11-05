const productItemModel = require('../../../models/data_model/lv3/productItem.model');
const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllProductItem = async (req, res) => {
    // Truy vấn SQL để lấy tất cả productItem và thay thế product_id bằng tên product với product_name được lấy từ bảng product thông qua product_id
    // SELECT product_item.*, product.name FROM product_item INNER JOIN product ON product_item.product_id = product.id ORDER BY id;
    try {
        const productItems = await productItemModel.findAll();
        const productItemPromises = productItems.map(async (productItem) => {
            const product = await productModel.findByPk(productItem.product_id);
            const category = await productCategoryModel.findByPk(product.category_id);
            delete product.dataValues.category_id;
            delete productItem.dataValues.product_id;
            return { ...productItem.dataValues
                ,product_name: product.name
                ,product_desc: product.description
                ,category_name: category.category_name 
            };
        }, Promise.resolve());
        const productItemsWithProduct = await Promise.all(productItemPromises);
        res.status(200).json(productItemsWithProduct);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving productItems."
        });
    }
}
exports.getProductItemByID = async (req, res) => {
    // Truy vấn SQL để lấy 1 productItem theo id và thay thế product_id bằng tên product với product_name được lấy từ bảng product thông qua product_id
    // SELECT product_item.*, product.name FROM product_item INNER JOIN product ON product_item.product_id = product.id WHERE product_item.id = :id;
    try {
        const ProductItem = await productItemModel.findByPk(req.params.id);
        if (!ProductItem) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const product = await productModel.findByPk(ProductItem.product_id);
        const category = await productCategoryModel.findByPk(product.category_id);
        delete product.dataValues.category_id;
        delete ProductItem.dataValues.product_id;
        const productItemWithProduct = { ...ProductItem.dataValues
            ,product_name: product.name
            ,product_desc: product.description
            ,category_name: category.category_name 
        };
        res.status(200).json(productItemWithProduct);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ProductItem."
        }); 
    }
}

exports.createProductItem = async (req, res) => {
    // Truy vấn SQL để tạo ProductItem mới, lấy product_id từ product thông qua product_name, sử dụng INSERT
    // INSERT INTO product_item (id, product_id, SKU, quantity_in_stock, price) SELECT :id, p.id, :SKU, :quantity_in_stock, :price FROM product p WHERE p.name = :product_name LIMIT 1;
    try {
        const product = await productModel.findOne({
            where: {
                name: req.body.product_name
            }
        })
        const category = await productCategoryModel.findByPk(product.category_id);

        const maxID = await productItemModel.max('id');
        const ProductItem = {
            id: maxID + 1,
            product_id: product.id,
            SKU: req.body.SKU,
            quantity_in_stock: req.body.quantity_in_stock,
            price: req.body.price,
            product_name: req.body.product_name,
            product_desc: product.description,
            category_name: category.category_name,
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
    // Truy vấn SQL để cập nhật ProductItem theo id, lấy product_id từ product thông qua product_name, sử dụng UPDATE
    // UPDATE product_item SET product_id = (SELECT p.id FROM product p WHERE p.name = :product_name LIMIT 1), SKU = :SKU, quantity_in_stock = :quantity_in_stock, price = :price WHERE id = :id;
    try {
        const product = await productModel.findOne({
            where: {
                name: req.body.product_name
            }
        })
        const ProductItem = {
            product_id: product.id,
            SKU: req.body.SKU,
            quantity_in_stock: req.body.quantity_in_stock,
            price: req.body.price,
        }
        const updatedProductItem = await productItemModel.update(ProductItem, {
            where: {
                id: req.params.id || req.body.id
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
    // Truy vấn SQL để xóa ProductItem theo id
    // DELETE FROM product_item WHERE id = :id;
    try {
        const deletedProductItem = await productItemModel.destroy({
            where: {
                id: req.params.id || req.body.id
            }
        });
        res.status(200).json(deletedProductItem);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the ProductItem."
        });
    }
}
