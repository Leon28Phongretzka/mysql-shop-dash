const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/data/address.controller');
const ProductCategoryController = require('../controllers/data/productCategory.controller');

// Address Controller
router.get('/address', (req, res) => {AddressController.getAllAddress(req, res);});
router.get('/address/:id', (req, res) => {AddressController.getAddress(req, res);});
router.post('/address', (req, res) => {AddressController.createAddress(req, res);});

// Product Category Controller
router.get('/product-category', (req, res) => {ProductCategoryController.getAllProductCategory(req, res);});
router.get('/product-category/:id', (req, res) => {ProductCategoryController.getProductCategoryById(req, res);});
router.post('/product-category', (req, res) => {ProductCategoryController.createProductCategory(req, res);});
router.put('/product-category/:id', (req, res) => {ProductCategoryController.updateProductCategory(req, res);});
router.delete('/product-category/:id', (req, res) => {ProductCategoryController.deleteProductCategory(req, res);});

module.exports = router;