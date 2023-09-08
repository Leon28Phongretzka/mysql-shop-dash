const AddressModel = require('../models/address.model');
const cacheUtil = require('../utils/cache.util');

exports.getCountryID = async (id) => {
    const [rows] = await AddressModel.sequelize.query('select * from country where id = ?', [id]);
    return rows[0].country_name;
}

exports.createAddress = (address) => {
    return AddressModel.create(address);
}

exports.getAllAddress = async() => {
    return AddressModel.findAll();
}

exports.getAddressById = (id) => {
    return AddressModel.findByPk(id);
}


exports.updateAddress = (id, address) => {
    return AddressModel.update(address, {
        where: {
            id: id
        }
    });
}

exports.deleteAddress = (id) => {
    return AddressModel.destroy({
        where: {
            id: id
        }
    });
}

exports.deleteAllAddress = () => {
    return AddressModel.destroy({
        where: {},
        truncate: false
    });
}



