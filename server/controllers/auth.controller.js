const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');

exports.register = async (req, res) => { 
    
    const isExist = await AuthService.findUserByEmail(req.body.email_address);
    if(isExist) {
        return res.status(400).json({ 
            message: 'Email already exists.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    // const maxID is the last id in the site_user table
    const maxID = await AuthService.maxID();
    const userData = {
        id: maxID + 1,
        email_address: req.body.email_address,
        password: hashedPassword,
        phone_number: req.body.phone_number
    }
    console.log(userData)
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => { 
    const user = await AuthService.findUserByEmail(req.body.email_address); 
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if (isMatched) {
            const access_token = jwtUtil.createToken({ id: user.id });
            const refresh_token = jwtUtil.createToken({ id: user.id }, jwtConfig.refresh_ttl);

            await AuthService.storeAccessToken(user.id, refresh_token);

            return res.json({
                access_token: access_token,
                refresh_token: refresh_token,
                token_type: 'Bearer',
                // expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized 1.' });
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.refresh_token;
    const decoded = jwtUtil.verifyToken(refreshToken);
    // console.log(decoded); console.log(decoded.id);
    // console.log((decoded));
    if(decoded && decoded.id) {
        // console.log(isValidRefreshToken);
        const new_access_token = jwtUtil.createToken({ id: decoded.id }, jwtConfig.ttl);
        await AuthService.storeAccessToken(decoded.id, new_access_token);
        return res.json({
            access_token: new_access_token,
            token_type: 'Bearer',
            expires_in: jwtConfig.ttl
        });
    }
    return res.status(400).json({ message: 'Unauthorized 2.' });
}


exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Logged out successfully.' });
}