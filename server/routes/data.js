const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/data/address.controller');

router.get('/addresses', (req, res) => {
    AddressController.getAllAddress(req, res);
});

module.exports = router;