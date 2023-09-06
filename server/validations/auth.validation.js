const Joi = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {  
    if(!passwordRegex.test(String(value))) { 
        throw new Error('Password should contains a lowercase, a uppercase character and a digit.')
    }
}

module.exports = {
    register: Joi.object().keys({
        // id from site_user table auto increment from database
        // id is increase by 1 from last id
        
        // id: Joi.number().integer().min(502).required(),
        email_address: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required().external(validatePassword),
        phone_number: Joi.string().required()
    }),
    login: Joi.object().keys({
        email_address: Joi.string().email().required(),
        password: Joi.string().required()
    })
}