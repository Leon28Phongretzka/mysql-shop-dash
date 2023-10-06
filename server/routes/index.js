const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.util'); 

/**
 * @swagger
 * /api/register:
 *  post:
 *   description: Register a user
 *   tags: [Auth]
 *   parameters:
 *      - name: email_address
 *        description: Email
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone_number
 *        description: Phone number
 *        in: formData
 *        required: true
 *        type: string
 *   responses:
 *      200:
 *          description: Register successfully
 *      400:
 *          description: Bad request
 */
router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
/**
 * @swagger
 * /api/login:
 *  post:
 *   description: Login
 *   tags: [Auth]
 *   parameters:
 *      - name: email_address
 *        description: Email
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *   responses:
 *      200:
 *          description: Register successfully
 *      400:
 *          description: Bad request
 */
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));
router.post('/refresh',  validate(schema.refresh),  ErrorHandler(AuthController.refreshToken));
router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
