const VariationOptionModel = require("../../../models/data_model/lv3/variationOption.model");
const VariationModel = require("../../../models/data_model/lv2/variation.model");
const productCategoryModel = require("../../../models/data_model/lv1/productCategory.model");
exports.getAllVariationOption = async (req, res) => {
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
    try {
        const variationOptions = await VariationOptionModel.findByPk(req.params.id);
        if (!variationOptions) {
            return res.status(404).json({
                message: "Address not found with id " + req.params.id
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





