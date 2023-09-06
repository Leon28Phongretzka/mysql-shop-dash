const { token } = require('morgan');
const UserModel = require('../models/user.model');
const cacheUtil = require('../utils/cache.util');

exports.createUser = (user) => {
    return UserModel.create(user);
}

exports.findUserByEmail = (email_address) => {
    return UserModel.findOne({
        where: {
            email_address: email_address
        }
    })
}

exports.findUserById = (id) => {
    return UserModel.findByPk(id);
}

exports.storeAccessToken = (id, token) => {
    return cacheUtil.get(`access_token:${id}`, token, 1000 * 60 * 60 * 24 * 30);
}

// exports.isValidRefreshToken = async (id, token) => {
//     const isValid = await cacheUtil.get(`refresh_token:${id}`);
//     return isValid === token;
// };

exports.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}