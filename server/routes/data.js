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
const UserAddressController = require('../controllers/data/lv3/userAddress.controller');
const shopOrderController = require('../controllers/data/lv3/shopOrder.controller');

// Table with reference lv4
const OrderLineController = require('../controllers/data/lv4/orderLine.controller');
const ShoppingCartItemController = require('../controllers/data/lv4/shoppingCartItem.controller');
const ProductConfigController = require('../controllers/data/lv4/productConfig.controller');

// Table with reference lv5
const UserReviewController = require('../controllers/data/lv5/userReview.controller');

/// Table without reference
// Country Controller
/**
 * @swagger
 * /data/country:
 *   get:
 *     summary: Lấy danh sách quốc gia
 *     description: Trả về danh sách tất cả quốc gia.
 *     responses:
 *       200:
 *         description: Thành công. Trả về danh sách quốc gia.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/country', (req, res) => {
    CountryController.getAllCountry(req, res);
  });
  
/**
* @swagger
* /data/country/{id}:
*   get:
*     summary: Lấy thông tin quốc gia theo ID
*     description: Trả về thông tin quốc gia dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của quốc gia
*     responses:
*       200:
*         description: Thành công. Trả về thông tin quốc gia.
*       404:
*         description: Không tìm thấy quốc gia theo ID.
*/
router.get('/country/:id', (req, res) => {
    CountryController.getCountryById(req, res);
});
  
/**
* @swagger
* /data/country:
*   post:
*     summary: Thêm quốc gia mới
*     description: Thêm một quốc gia mới vào hệ thống.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Country'
*     responses:
*       201:
*         description: Thành công. Trả về thông tin quốc gia đã được thêm.
*       400:
*         description: Lỗi yêu cầu không hợp lệ.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.post('/country', (req, res) => {
    CountryController.addCountry(req, res);
});

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
router.post('/promotion', (req, res) => {PromotionController.createPromotion(req, res);});
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
router.get('/shopping-cart/:id', (req, res) => {ShoppingCartController.getShoppingCartsByUserID(req, res);});
router.post('/shopping-cart', (req, res) => {ShoppingCartController.createShoppingCart(req, res);});
router.put('/shopping-cart/:id', (req, res) => {ShoppingCartController.updateShoppingCart(req, res);});

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
router.get('/product-item', (req, res) => {ProductItemController.getAllProductItem(req, res);});
router.get('/product-item/:id', (req, res) => {ProductItemController.getProductItemByID(req, res);});
router.post('/product-item', (req, res) => {ProductItemController.createProductItem(req, res);});
router.put('/product-item/:id', (req, res) => {ProductItemController.updateProductItem(req, res);});//, jwtUtil.verifyAccessToken, jwtUtil.verifyAdminRole
router.delete('/product-item/:id', (req, res) => {ProductItemController.deleteProductItem(req, res);});

// User Address Controller
router.get('/user-address', (req, res) => {UserAddressController.getAllUserAddress(req, res);});
router.get('/user-address/:id', (req, res) => {UserAddressController.getUserAddressByID(req, res);});
// Shop Order Controller
router.get('/shop-order', (req, res) => {shopOrderController.getAllShopOrder(req, res);});
router.get('/shop-order/:id', (req, res) => {shopOrderController.getShopOrderByID(req, res);});

/// Table with reference lv4
// Order Line Controller
router.get('/order-line', (req, res) => {OrderLineController.getAllOrderLine(req, res);});
router.get('/order-line/:id', (req, res) => {OrderLineController.getOrderLineByID(req, res);});
router.post('/order-line', (req, res) => {OrderLineController.createOrderLine(req, res);});//, jwtUtil.verifyAccessToken, jwtUtil.verifyAdminRole
router.put('/order-line/:id', (req, res) => {OrderLineController.updateOrderLine(req, res);});

// Shopping Cart Item Controller
router.get('/shopping-cart-item', (req, res) => {ShoppingCartItemController.getAllShoppingCartItem(req, res);});
router.get('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.getShoppingCartItemByID(req, res);});
// router.post()
// Product Config Controller
router.get('/product-config', (req, res) => {ProductConfigController.getAllProductConfig(req, res);});
router.post('/product-config', (req, res) => {ProductConfigController.createProductConfig(req, res);});
router.put('/product-config/:id', (req, res) => {ProductConfigController.updateProductConfig(req, res);});

/// Table with reference lv5
// User Review
router.get('/user-review', (req, res) => {UserReviewController.getAllUserReview(req, res);});
router.get('/user-review/:id', (req, res) => {UserReviewController.getUserReviewByID(req, res);});

module.exports = router;