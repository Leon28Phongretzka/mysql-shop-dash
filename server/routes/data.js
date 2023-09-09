const express = require('express');
const router = express.Router();

const CountryController = require('../controllers/data/country.controller');
const ProductCategoryController = require('../controllers/data/productCategory.controller');
const orderStatusController = require('../controllers/data/orderStatus.controller');
const PromotionController = require('../controllers/data/promotion.controller');
const VariationOptionController = require('../controllers/data/variationOption.controller');


const AddressController = require('../controllers/data/address.controller');

/// Table without reference

// Country Controller
router.get('/country', (req, res) => {CountryController.getAllCountry(req, res);});
router.get('/country/:id', (req, res) => {CountryController.getCountryById(req, res);});
router.post('/country', (req, res) => {CountryController.addCountry(req, res);});
// router.delete('/duplicate-country', (req, res) => {CountryController.deleteAllDuplicateCountry(req, res);});

// Product Category Controller
router.get('/product-category', (req, res) => {ProductCategoryController.getAllProductCategory(req, res);});
router.get('/product-category/:id', (req, res) => {ProductCategoryController.getProductCategoryById(req, res);});
router.post('/product-category', (req, res) => {ProductCategoryController.createProductCategory(req, res);});
router.put('/product-category/:id', (req, res) => {ProductCategoryController.updateProductCategory(req, res);});
router.delete('/product-category/:id', (req, res) => {ProductCategoryController.deleteProductCategory(req, res);});


// Order Status Controller
router.get('/orderStatus', (req, res) => {orderStatusController.getAllOrderStatus(req, res);});

// Payment Type Controller
router.get('/payment-type', (req, res) => {PaymentTypeController.getAllPaymentType(req, res);});

// Promotion Controller
router.get('/promotion', (req, res) => {PromotionController.getAllPromotion(req, res);});
router.get('/expired-promotion', (req, res) => {PromotionController.getExpriedPromotion(req, res);});


/// Table with reference
// Address Controller
router.get('/address', (req, res) => {AddressController.getAllAddress(req, res);});
router.get('/address/:id', (req, res) => {AddressController.getAddress(req, res);});
router.post('/address', (req, res) => {AddressController.createAddress(req, res);});

router.get('/variation-option', (req, res) => {VariationOptionController.getAllVariationOption(req, res);});


module.exports = router;