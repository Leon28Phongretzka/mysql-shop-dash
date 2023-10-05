const VariationOptionModel = require("../../../models/data_model/lv3/variationOption.model");
const VariationModel = require("../../../models/data_model/lv2/variation.model");
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
    try {
        const variation_id = await VariationModel.findOne({
            where: {
                name: req.body.variation_name
            }
        });
        console.log(variation_id);
        const maxID = await VariationOptionModel.max('id');
        const variationOption = {
            id: maxID + 1,
            variation_id: variation_id.id,
            value: req.body.value,
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
        const variation_id = await VariationModel.findOne({
            where: {
                name : req.body.variation_name
            }
        });
        const variationOption = {
            variation_id: variation_id.id,
            value: req.body.value,
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





