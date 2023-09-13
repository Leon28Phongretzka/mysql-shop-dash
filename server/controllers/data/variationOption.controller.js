const VariationOption = require("../../models/variationOption.model");

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

