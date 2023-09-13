const SiteUserModel = require('../../models/data_model/siteUser.model');

exports.getMaxID = async (req, res) => {
    try {
        const maxID = await SiteUserModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving max id."
        });
    }
}
exports.getAllSiteUser = async (req, res) => {
    try {
        const siteUser = await SiteUserModel.findAll();
        res.status(200).json(siteUser);

    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving siteUser."
        });
    }
}
exports.getSiteUserById = async (req, res) => {
    try {
        const SiteUser = await SiteUserModel.findByPk(req.params.id);
        if (!SiteUser) {
            return res.status(404).json({
                message: "SiteUser not found with id " + req.params.id
            });
        }
        res.status(200).json(SiteUser);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving country."
        });
    }
}