const ProductConfigModel = require('../../../models/data_model/lv3/productConfig.model');

const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllProductConfig = async (req, res) => {
    try {
        const ProductConfigs = await ProductConfigModel.findAll();
        res.status(200).json(ProductConfigs);

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving ProductConfig."
        });
    }
}
