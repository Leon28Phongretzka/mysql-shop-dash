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
 *     tags: [Country]
 *     summary: Lấy danh sách quốc gia
 *     description: Trả về danh sách tất cả quốc gia.
 *     responses:
 *       200:
 *         description: Thành công. Trả về danh sách quốc gia.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/country', (req, res) => {CountryController.getAllCountry(req, res);});
  
/**
* @swagger
* /data/country/{id}:
*   get:
*     tags: [Country]
*     summary: Lấy thông tin quốc gia theo ID
*     description: Trả về thông tin quốc gia dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           required: true
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
 *     tags: [Country]
 *     description: Tạo mới quốc gia
 *     parameters:
 *      - name: id
 *        description: ID quốc gia
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: country_name
 *        description: Tên quốc gia
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/country', (req, res) => {
    CountryController.addCountry(req, res);
});

// Product Category Controller
/**
 * @swagger
 * /data/product-category:
 *  get:
 *      tags: [Product Category]
 *      summary: Lấy danh sách danh mục sản phẩm
 *      description: Trả về danh sách tất cả danh mục sản phẩm
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Product Category
 *          500:
 *              description: Wut!
 * 
 */
router.get('/product-category', (req, res) => {
    ProductCategoryController.getAllProductCategory(req, res);
});

/**
* @swagger
* /data/product-category/{id}:
*   get:
*     tags: [Product Category]
*     summary: Lấy thông tin sản phẩm theo ID
*     description: Trả về thông tin sản phẩm dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của sản phẩm
*     responses:
*       200:
*         description: Thành công. Trả về thông tin sản phẩm.
*       404:
*         description: Không tìm thấy sản phẩm theo ID.
*/
router.get('/product-category/:id', (req, res) => {
    ProductCategoryController.getProductCategoryById(req, res);
});

/**
 * @swagger
 * /data/product-category:
 *   post:
 *     tags: [Product Category]
 *     description: Tạo mới danh mục sản phẩm
 *     parameters:
 *      - name: id
 *        description: ID danh mục sản phẩm
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: category_name
 *        description: Tên danh mục sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục sản phẩm đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/product-category', (req, res) => {ProductCategoryController.createProductCategory(req, res);});

/**
 * @swagger
 * /data/product-category/{id}:
 *   put:
 *     tags: [Product Category]
 *     description: Sửa danh mục sản phẩm
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục sản phẩm
 *      - name: category_name
 *        description: Tên danh mục sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục sản phẩm đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/product-category/:id', (req, res) => {ProductCategoryController.updateProductCategory(req, res);});

/**
* @swagger
* /data/product-category/{id}:
*   delete:
*     tags: [Product Category]
*     summary: Xóa danh mục sản phẩm
*     description: Xóa danh mục sản phẩm dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục sản phẩm
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy sản phẩm theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/product-category/:id', (req, res) => {ProductCategoryController.deleteProductCategory(req, res);});

// Order Status Controller
// Product Category Controller
/**
 * @swagger
 * /data/orderStatus:
 *  get:
 *      tags: [Order Status]
 *      summary: Lấy danh sách phương thức đặt hàng
 *      description: Trả về danh sách tất cả phương thức đặt hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Order Status
 *          500:
 *              description: Wut!
 * 
 */
router.get('/orderStatus', (req, res) => {orderStatusController.getAllOrderStatus(req, res);});

// Payment Type Controller
// Product Category Controller
/**
 * @swagger
 * /data/payment-type:
 *  get:
 *      tags: [Payment Type]
 *      summary: Lấy danh sách phương thức thanh toán
 *      description: Trả về danh sách tất cả phương thức thanh toán
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Payment Type
 *          500:
 *              description: Wut!
 * 
 */
router.get('/payment-type', (req, res) => {PaymentTypeController.getAllPaymentType(req, res);});

// Promotion Controller

/**
 * @swagger
 * /data/promotion:
 * get:
 *      tags: [Promotion]
 *      summary: Lấy danh sách khuyến mãi
 *      description: Trả về danh sách tất cả danh sách chiết khấu
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Promotion
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/promotion', (req, res) => {PromotionController.getAllPromotion(req, res);});

/**
 * @swagger
 * /data/promotion:
 * get:
 *      tags: [Promotion]
 *      summary: Lấy danh sách khuyến mãi hết hạn
 *      description: Trả về danh sách tất cả danh sách chiết khấu hết hạn
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Promotion
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/expired-promotion', (req, res) => {PromotionController.getExpriedPromotion(req, res);});

/**
 * @swagger
 * /data/promotion:
 *   post:
 *     tags: [Promotion]
 *     description: Tạo mới danh mục chiết khấu
 *     parameters:
 *      - name: id
 *        description: ID danh mục sản phẩm
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: promotion_name
 *        description: Tên danh mục chiết khấu
 *        in: formData
 *        required: true
 *        type: string
 *      - name: promotion_description
 *        description: Mô tả danh mục chiết khấu
 *        in: formData
 *        required: true
 *        type: string
 *      - name: discount_rate
 *        description: Phần trăm chiết khấu
 *        in: formData
 *        required: true
 *        type: interger
 *      - name: start_date
 *        description: Thời gian bắt đầu
 *        in: formData
 *        required: true
 *        type: date
 *      - name: end_date
 *        description: Thời gian kết thúc
 *        in: formData
 *        required: true
 *        type: date
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục sản phẩm đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/promotion', (req, res) => {PromotionController.createPromotion(req, res);});

/**
* @swagger
* /data/promotion/expired-promotion:
*   delete:
*     tags: [Promotion]
*     summary: Xóa danh mục sản phẩm hết hạn chiết khấu
*     description: Xóa danh mục sản phẩm dựa trên hạn được cung cấp.
*     parameters:
*       - in: path
*         name: end_date
*         required: true
*         schema:
*           type: date
*         description: end_date của danh mục sản phẩm
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy sản phẩm theo end_date.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/expired-promotion', (req, res) => {PromotionController.deleteExpiredPromotion(req, res);});

/**
* @swagger
* /data/promotion/{id}:
*   delete:
*     tags: [Promotion]
*     summary: Xóa danh mục sản phẩm
*     description: Xóa danh mục sản phẩm dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục sản phẩm
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy sản phẩm theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/promotion/:id', (req, res) => {PromotionController.deletePromotion(req, res);});

//Shipping Medthod Controller

/**
 * @swagger
 * /data/shipping-method:
 * get:
 *      tags: [Shipping-method]
 *      summary: Lấy danh sách phương thức vận chuyển
 *      description: Trả về danh sách tất cả danh sách phương thức vận chuyển
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên Shipping-method
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/shipping-method', (req, res) => {ShippingMedhodController.getAllShippingMethod(req, res);});

/**
* @swagger
* /data/shipping-method/{id}:
*   get:
*     tags: [Shipping-method]
*     summary: Lấy thông tin phương thức vận chuyển theo ID
*     description: Trả về thông tin phương thức dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*           required: true
*         description: ID của phương thức vận chuyển
*     responses:
*       200:
*         description: Thành công. Trả về phương thức vận chuyển.
*       404:
*         description: Không tìm thấy phương thức theo ID.
*/
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
router.post('/user-address', (req, res) => {UserAddressController.createUserAddress(req, res);});
router.put('/user-address/:id', (req, res) => {UserAddressController.updateUserAddress(req, res);});
router.delete('/user-address/:id', (req, res) => {UserAddressController.deleteUserAddress(req, res);});

// Shop Order Controller
router.get('/shop-order', (req, res) => {shopOrderController.getAllShopOrder(req, res);});
router.get('/shop-order/:id', (req, res) => {shopOrderController.getShopOrderByID(req, res);});
router.post('/shop-order', (req, res) => {shopOrderController.createShopOrder(req, res);});
router.put('/shop-order/:id', (req, res) => {shopOrderController.updateShopOrder(req, res);});

/// Table with reference lv4
// Order Line Controller
router.get('/order-line', (req, res) => {OrderLineController.getAllOrderLine(req, res);});
router.get('/order-line/:id', (req, res) => {OrderLineController.getOrderLineByID(req, res);});
router.post('/order-line', (req, res) => {OrderLineController.createOrderLine(req, res);});//, jwtUtil.verifyAccessToken, jwtUtil.verifyAdminRole
router.put('/order-line/:id', (req, res) => {OrderLineController.updateOrderLine(req, res);});

// Shopping Cart Item Controller
router.get('/shopping-cart-item', (req, res) => {ShoppingCartItemController.getAllShoppingCartItem(req, res);});
router.get('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.getShoppingCartItemByID(req, res);});
router.post('/shopping-cart-item', (req, res) => {ShoppingCartItemController.createShoppingCartItem(req, res);});   
router.put('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.updateShoppingCartItem(req, res);});
router.delete('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.deleteShoppingCartItem(req, res);});

// Product Config Controller
router.get('/product-config', (req, res) => {ProductConfigController.getAllProductConfig(req, res);});
router.post('/product-config', (req, res) => {ProductConfigController.createProductConfig(req, res);});
router.put('/product-config/:id', (req, res) => {ProductConfigController.updateProductConfig(req, res);});
router.delete('/product-config/:id', (req, res) => {ProductConfigController.deleteProductConfig(req, res);});

/// Table with reference lv5
// User Review
router.get('/user-review', (req, res) => {UserReviewController.getAllUserReview(req, res);});
router.get('/user-review/:id', (req, res) => {UserReviewController.getUserReviewByID(req, res);});
router.post('/user-review', (req, res) => {UserReviewController.createUserReview(req, res);});
router.put('/user-review/:id', (req, res) => {UserReviewController.updateUserReview(req, res);});
router.delete('/user-review/:id', (req, res) => {UserReviewController.deleteUserReview(req, res);});

module.exports = router;