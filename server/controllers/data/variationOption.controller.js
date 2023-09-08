const VariationOption = require("../../models/variationOption.model");

exports.getAllVariationOption = async (req, res) => {
    try {
        const variationOptions = await VariationOption.findAll();
        res.status(200).json(variationOptions)
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product categories."
        });
        //console.log(err);
    }
}