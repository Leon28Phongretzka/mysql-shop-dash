const userPaymentMethodModel = require('../../../models/data_model/lv2/userPaymentMethod.model');
const paymentType = require('../../../models/data_model/lv1/paymentType.model');
const UserModel = require('../../../models/auth_model/user.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");

exports.getAllUserPaymentMethod = async (req, res) => {
    // Truy vấn SQL để lấy tất cả userPaymentMethod và thay thế payment_type_id bằng tên payment_type với payment_type_name được lấy từ bảng payment_type thông qua payment_type_id
    // SELECT user_payment_method.*, payment_type.value FROM user_payment_method INNER JOIN payment_type ON user_payment_method.payment_type_id = payment_type.id ORDER BY id;
    try {
        const userPaymentMethods = await userPaymentMethodModel.findAll({});
        const userPaymentMethodPromises = userPaymentMethods.map(async (userPaymentMethod) => {
            const payment_type = await paymentType.findByPk(userPaymentMethod.payment_type_id);
            const user = await UserModel.findByPk(userPaymentMethod.user_id);
            delete userPaymentMethod.dataValues.payment_type_id;
            return { ...userPaymentMethod.dataValues, 
                payment_type_name: payment_type.value, 
                email_address: user.email_address 
            };
        });
        res.status(200).json(await Promise.all(userPaymentMethodPromises));
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethods."
        });
    }
}

exports.getUserPaymentMethodById = async (req, res) => {
    // Truy vấn SQL để lấy userPaymentMethod theo id và thay thế payment_type_id bằng tên payment_type với payment_type_name được lấy từ bảng payment_type thông qua payment_type_id

    // SELECT user_payment_method.*, payment_type.value FROM user_payment_method INNER JOIN payment_type ON user_payment_method.payment_type_id = payment_type.id WHERE user_payment_method.id = :id;
    try {
        
        const userPaymentMethod = await userPaymentMethodModel.findByPk(req.params.id);
        if (!userPaymentMethod) {
            return res.status(404).json({
                message: "userPaymentMethod not found with id " + req.params.id
            });
        }
        res.status(200).json(userPaymentMethod);       
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethod."
        });
    }
}

exports.createUserPaymentMethod = async (req, res) => {
    // Truy vấn SQL để tạo userPaymentMethod mới cho người dùng, lấy payment_type_id từ payment_type thông qua payment_type_name, sử dụng INSERT và JOIN

    // INSERT INTO user_payment_method (id, user_id, payment_type_id, provider, account_number, is_default)
    // SELECT :id, :user_id, pt.id, :provider, :account_number, :is_default
    // FROM payment_type pt
    // WHERE pt.value = :payment_type_name;

    try {
        const payment_type_id = await paymentType.findOne({ 
            where: { 
                payment_type_name: req.body.payment_type_name 
            } 
        });
        const maxID = await userPaymentMethodModel.max('id');
        const userPaymentMethod = {
            id: maxID + 1,
            user_id: req.body.user_id,
            payment_type_id: payment_type_id.id,
            provider: req.body.provider,
            account_number: req.body.account_number,
            is_default: req.body.is_default
        }
        const newUserPaymentMethod = await userPaymentMethodModel.create(userPaymentMethod);
        res.status(200).json(newUserPaymentMethod);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving userPaymentMethod."
        });
    }
}