const VariationOptionModel = require("../../../models/data_model/lv3/variationOption.model");
const VariationModel = require("../../../models/data_model/lv2/variation.model");
const productCategoryModel = require("../../../models/data_model/lv1/productCategory.model");
exports.getAllVariationOption = async (req, res) => {
    // Truy vấn SQL lấy tất cả các VariationOption từ bảng variation_option, với các trường: id, variation_id, value, variation_name, category_name
    // SELECT vo.id, vo.variation_id, vo.value, v.name AS variation_name, pc.category_name AS category_name FROM variation_option AS vo JOIN variation AS v ON vo.variation_id = v.id JOIN product_category AS pc ON v.category_id = pc.id;
    try {
        const variationOptions = await VariationOptionModel.findAll();
        const variationOptionPromises = variationOptions.map(async (variationOption) => {
            const variation = await VariationModel.findByPk(variationOption.variation_id);
            const category = await productCategoryModel.findByPk(variation.category_id);
            delete variation.dataValues.category_id;
            delete variationOption.dataValues.variation_id;
            return { ...variationOption.dataValues
                ,variation_name: variation.name
                ,category_name: category.category_name 
            };
        }, Promise.resolve());
        const variationOptionsWithVariation = await Promise.all(variationOptionPromises);
        res.status(200).json(variationOptionsWithVariation);        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred."
        });
    }
}

exports.getVariationOptionID = async (req, res) => {
    // Truy vấn SQL lấy 1 VariationOption theo id từ bảng variation_option, với các trường: id, variation_id, value, variation_name, category_name
    // SELECT vo.id, vo.variation_id, vo.value, v.name AS variation_name, pc.category_name AS category_name FROM variation_option AS vo JOIN variation AS v ON vo.variation_id = v.id JOIN product_category AS pc ON v.category_id = pc.id WHERE vo.id = :id;
    try {
        const variationOptions = await VariationOptionModel.findByPk(req.params.id);
        if (!variationOptions) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
            });
        }
        const variation = await VariationModel.findByPk(variationOptions.variation_id);
        const category = await productCategoryModel.findByPk(variation.category_id);
        delete variation.dataValues.category_id;
        const variationOptionWithVariation = { ...variationOptions.dataValues
            ,variation_name: variation.name
            ,category_name: category.category_name 
        };
        res.status(200).json(variationOptionWithVariation);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}

exports.createVariationOption = async (req, res) => {
    // Truy vấn SQL tạo 1 VariationOption mới trong bảng variation_option, với các trường: id, variation_id, value, variation_name, category_name; trong đó variation_id lấy từ variation_name, category_name lấy từ variation_id
    // INSERT INTO variation_option (id, variation_id, value) VALUES (:id, (SELECT id FROM variation WHERE name = :variation_name), :value);
    try {
        const variation = await VariationModel.findOne({
            where: {
                name: req.body.variation_name
            }
        });
        const category = await productCategoryModel.findByPk(variation.category_id);
        console.log(variation);
        const maxID = await VariationOptionModel.max('id');
        const variationOption = {
            id: maxID + 1,
            variation_id: variation.id,
            value: req.body.value,
            variation_name: variation.name,
            category_name: category.category_name,
        }
        console.log(variationOption);
        const newVariationOption = await VariationOptionModel.create(variationOption);
        res.status(200).json(newVariationOption);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}

exports.updateVariationOption = async (req, res) => {
    // Truy vấn SQL update 1 VariationOption theo id từ bảng variation_option, với các trường: id, variation_id, value, variation_name, category_name; trong đó variation_id lấy từ variation_name, category_name lấy từ variation_id
    // UPDATE variation_option SET variation_id = (SELECT id FROM variation WHERE name = :variation_name LIMIT 1), value = :value WHERE id = :id;
    try {
        const variationOptions = await VariationOptionModel.findByPk(req.params.id);
        if (!variationOptions) {
            return res.status(404).json({
                message: "Can not find variation option with id " + req.params.id
            });
        }
        const variation = await VariationModel.findOne({
            where: {
                name : req.body.variation_name
            }
        });
        const category = await productCategoryModel.findByPk(variation.category_id);
        const variationOption = {
            value: req.body.value,
            variation_id: variation.id,
            variation_name: variation.name,
            category_name: category.category_name,
        }
        const newVariationOption = await VariationOptionModel.update(variationOption, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(newVariationOption);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}





