const VariationOption = require("../../../models/data_model/lv3/variationOption.model");

exports.getAllVariationOption = async (req, res) => {
    try {
        const variationOptions = await VariationOption.findAll();
        res.status(200).json(variationOptions)
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred."
        });
        //console.log(err);
    }
}

exports.getVariationOptionID = async (req, res) => {
    try {
        const variationOptions = await VariationOption.findByPk(req.params.id);
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
        const maxID = await VariationOption.max('id');
        const variationOption = {
            id: maxID + 1,
            variation_id: req.body.variation_id,
            value: req.body.value
        }
        const createdVariationOption = await VariationOption.create(variationOption);
        res.status(201).json(createdVariationOption);
    } catch (error) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving VariationOption."
        }); 
    }
}

