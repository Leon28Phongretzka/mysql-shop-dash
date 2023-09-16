const VariationOptionModel = require("../../../models/data_model/lv3/variationOption.model");
const VariationModel = require("../../../models/data_model/lv2/variation.model");
const ProductCategoryModel = require("../../../models/data_model/lv1/productCategory.model")
exports.getAllVariationOption = async (req, res) => {
    try {
        const variationOptions = await VariationOptionModel.findAll();
        res.status(200).json(variationOptions)
        
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
        res.status(200).json(variationOptions);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}

exports.createVariationOption = async (req, res) => {
    const variationOption = await VariationModel.findOne({
        where: {
            name: req.body.variation_name
        }
    })
    try {
        const maxID = await VariationOptionModel.max('id');
        const variationOption = {
            id: maxID + 1,
            variation_id: variationOption.id,
            value: req.body.value
        }
        const createdVariationOption = await VariationOption.create(variationOption);
        res.status(201).json(createdVariationOption);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}




