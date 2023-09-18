const express = require('express');
const router = express.Router();

// Table without reference
const CountryController = require('../controllers/data/lv1/country.controller');
const ProductCategoryController = require('../controllers/data/lv1/productCategory.controller');
const orderStatusController = require('../controllers/data/lv1/orderStatus.controller');
const PromotionController = require('../controllers/data/lv1/promotion.controller');
const ShippingMedhodController = require('../controllers/data/lv1/shippingMethod.controller');

// Table with reference lv2
const AddressController = require('../controllers/data/lv2/address.controller');
const ProductController = require('../controllers/data/lv2/product.controller');
const ShoppingCartController = require('../controllers/data/lv2/shoppingCart.controller');
const VariationController = require('../controllers/data/lv2/variation.controller');
const userPaymentMethodController = require('../controllers/data/lv2/userPaymentMethod.controller');
const promotionCategoryController = require('../controllers/data/lv2/promotionCategory.controller');

// Table with reference lv3
const VariationOptionController = require('../controllers/data/lv3/variationOption.controller');
const ProductItemController = require('../controllers/data/lv3/productItem.controller');

/// Table with reference

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
router.delete('/expired-promotion', (req, res) => {PromotionController.deleteExpiredPromotion(req, res);});
router.delete('/promotion/:id', (req, res) => {PromotionController.deletePromotion(req, res);});

//Shipping Medthod Controller
router.get('/shipping-method', (req, res) => {ShippingMedhodController.getAllShippingMethod(req, res);});
router.get('/shipping-method/:id', (req, res) => {ShippingMedhodController.getShippingMethodById(req, res);});


/// Table with reference lv2
// Address Controller
router.get('/address', (req, res) => {AddressController.getAllAddress(req, res);});
router.get('/address/:id', (req, res) => {AddressController.getAddress(req, res);});
router.post('/address', (req, res) => {AddressController.createAddress(req, res);});
router.put('/address/:id', (req, res) => {AddressController.updateAddress(req, res);});
router.delete('/address/:id', (req, res) => {AddressController.deleteAddress(req, res);});

// Product Controller
router.get('/product', (req, res) => {ProductController.getAllProduct(req, res);});
router.get('/product/:id', (req, res) => {ProductController.getProductById(req, res);});
router.post('/product', (req, res) => {ProductController.createProduct(req, res);});
router.put('/product/:id', (req, res) => {ProductController.updateProduct(req, res);});
router.delete('/product/:id', (req, res) => {ProductController.deleteProduct(req, res);});

// Shopping Cart Controller
router.get('/shopping-cart', (req, res) => {ShoppingCartController.getAllShoppingCarts(req, res);});

//Variation Controller
router.get('/variation', (req, res) => {VariationController.getAllVariation(req, res);});
router.get('/variation/:id', (req, res) => {VariationController.getVariationByID(req, res)})
router.post('/variation', (req, res) => {VariationController.createVariation(req, res);});
router.put('/variation/:id', (req, res) => {VariationController.updateVariation(req, res);});
router.delete('/variation/:id', (req, res) => {VariationController.deleteVariation(req, res);});
// userPaymentMethod Controller
router.get('/user-payment-method', (req, res) => {userPaymentMethodController.getAllUserPaymentMethod(req, res);});

// promotionCategory Controller
router.get('/promotion-category', (req, res) => {promotionCategoryController.getAllPromotionCategory(req, res);});
router.get('/promotion-category/:id', (req, res) => {promotionCategoryController.getPromotionCategoryById(req, res);});
router.post('/promotion-category', (req, res) => {promotionCategoryController.createPromotionCategory(req, res);});
router.put('/promotion-category/:id', (req, res) => {promotionCategoryController.updatePromotionCategory(req, res);});
router.delete('/promotion-category/:id', (req, res) => {promotionCategoryController.deletePromotionCategory(req, res);});

/// Table with reference lv3
// VariationOption Controller
router.get('/variation-option', (req, res) => {VariationOptionController.getAllVariationOption(req, res);});
router.get('/variation-option/:id', (req, res) => {VariationOptionController.getVariationOptionID(req, res)})
router.post('/variation-option', (req, res) => {VariationOptionController.createVariationOption(req, res);});
router.put('/variation-option/:id', (req, res) => {VariationOptionController.updateVariationOption(req, res);});

// Product Item Controller
module.exports = router;