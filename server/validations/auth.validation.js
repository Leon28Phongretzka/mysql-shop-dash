const Joi = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {  
    if(!passwordRegex.test(String(value))) { 
        throw new Error('Password should contains a lowercase, a uppercase character and a digit.')
    }
}

module.exports = {
    register: Joi.object().keys({
        email_address: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required().external(validatePassword),
        phone_number: Joi.string().required()
    }),
    login: Joi.object().keys({
        email_address: Joi.string().email().required(),
        password: Joi.string().required()
    })
}