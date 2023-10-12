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
 *              description: Lỗi máy chủ nội bộ
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
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/payment-type', (req, res) => {PaymentTypeController.getAllPaymentType(req, res);});

// Promotion Controller
/**
 * @swagger
 * /data/promotion:
 *  get:
 *      tags: [Promotion]
 *      summary: Lấy danh sách các khuyến mãi
 *      description: Trả về danh sách tất cả các khuyến mãi
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin tất cả các khuyến mãi đã xuất ra
 *          500:
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/promotion', (req, res) => {PromotionController.getAllPromotion(req, res);});
/**
 * @swagger
 * /data/expired-promotion:
 *  get:
 *      tags: [Promotion]
 *      summary: Lấy danh sách các khuyến mãi
 *      description: Trả về danh sách tất cả các khuyến mãi
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin tất cả các khuyến mãi đã xuất ra
 *          500:
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/expired-promotion', (req, res) => {PromotionController.getExpriedPromotion(req, res);});

/**
 * @swagger
 * /data/promotion:
 *   post:
 *     tags: [Promotion]
 *     description: Tạo mới khuyến mãi
 *     parameters:
 *      - name: id
 *        description: ID khuyễn mãi
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: name
 *        description: Tên khuyến mãi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        required: true
 *        type: string
 *      - name: start_date
 *        description: Ngày bắt đầu khuyến mãi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: end_date
 *        description: Ngày kết thúc khuyến mãi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: discount
 *        description: Giá trị giảm giá
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Created
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/promotion', (req, res) => {PromotionController.createPromotion(req, res);});
/**
* @swagger
* /data/promotion/{id}:
*   delete:
*     tags: [Promotion]
*     summary: Xóa khuyến mãi
*     description: Xóa khuyến mãi dựa trên ID được cung cấp.
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
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/promotion/:id', (req, res) => {PromotionController.deletePromotion(req, res);});

//Shipping Medthod Controller
router.get('/shipping-method', (req, res) => {ShippingMedhodController.getAllShippingMethod(req, res);});
router.get('/shipping-method/:id', (req, res) => {ShippingMedhodController.getShippingMethodById(req, res);});

/// Table with reference lv2
// Address Controller
/**
 * @swagger
 * /data/address:
 *  get:
 *      tags: [Address]
 *      summary: Lấy danh sách địa chỉ khách hàng đã đăng ký tài khoản
 *      description: Trả về danh sách tất cả các địa chỉ khách hàng đã đăng ký tài khoản
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin tất cả các địa chỉ khách hàng đã đăng ký tài khoản
 *          500:
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/address', (req, res) => {AddressController.getAllAddress(req, res);});
/**
* @swagger
* /data/address/{id}:
*   get:
*     tags: [Address]
*     summary: Lấy thông tin địa chỉ theo ID
*     description: Trả về thông tin dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của địa chỉ
*     responses:
*       200:
*         description: Thành công. Trả về thông tin địa chỉ
*       404:
*         description: Không tìm thấy địa chỉ theo ID.
*/
router.get('/address/:id', (req, res) => {AddressController.getAddress(req, res);});
/**
 * @swagger
 * /data/address:
 *   post:
 *     tags: [Address]
 *     description: Tạo mới địa chỉ
 *     parameters:
 *      - name: id
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: unit_number
 *        description: Số lượng đặt hàng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: street_number
 *        description: Số nhà
 *        in: formData
 *        required: true
 *        type: number
 *      - name: address_line1
 *        description: Địa chỉ nhà ( L1 )
 *        in: formData
 *        required: true
 *        type: string
 *      - name: address_line2
 *        description: Địa chỉ nhà ( L2 )
 *        in: formData
 *        required: true
 *        type: string
 *      - name: city
 *        description: Thành phố
 *        in: formData
 *        required: true
 *        type: string
 *      - name: region
 *        description: Khu vực
 *        in: formData
 *        required: true
 *        type: string
 *      - name: postal_code
 *        description: Mã bưu chính
 *        in: formData
 *        required: true
 *        type: string
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
 *       409:
 *         description: Danh mục sản phẩm đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/address', (req, res) => {AddressController.createAddress(req, res);});
/**
 * @swagger
 * /data/address/{id}:
 *   put:
 *     tags: [Address]
 *     description: Chỉnh sửa thông tin đặt hàng
 *     parameters:
 *      - name: id
 *        description: ID địa chỉ cần cập nhật
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: unit_number
 *        description: Số lượng đặt hàng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: street_number
 *        description: Số nhà
 *        in: formData
 *        required: true
 *        type: number
 *      - name: address_line1
 *        description: Địa chỉ nhà ( L1 )
 *        in: formData
 *        required: true
 *        type: string
 *      - name: address_line2
 *        description: Địa chỉ nhà ( L2 )
 *        in: formData
 *        required: true
 *        type: string
 *      - name: city
 *        description: Thành phố
 *        in: formData
 *        required: true
 *        type: string
 *      - name: region
 *        description: Khu vực
 *        in: formData
 *        required: true
 *        type: string
 *      - name: postal_code
 *        description: Mã bưu chính
 *        in: formData
 *        required: true
 *        type: string
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
 *       409:
 *         description: Danh mục sản phẩm đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/address/:id', (req, res) => {AddressController.updateAddress(req, res);});
/**
* @swagger
* /data/address/{id}:
*   delete:
*     tags: [Address]
*     summary: Xóa thông tin địa chỉ
*     description: Xóa thông tin địa chỉ dựa trên ID được cung cấp.
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
router.delete('/address/:id', (req, res) => {AddressController.deleteAddress(req, res);});

// Product Controller
/**
 * @swagger
 * /data/product:
 *  get:
 *      tags: [Product]
 *      summary: Lấy danh sách sản phẩm
 *      description: Trả về danh sách tất cả các sản phẩm
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin sản phẩm
 *          500:
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/product', (req, res) => {ProductController.getAllProduct(req, res);});

/**
* @swagger
* /data/product/{id}:
*   get:
*     tags: [Product]
*     summary: Lấy thông tin sản phẩm theo ID
*     description: Trả về thông tin dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của sản phẩm
*     responses:
*       200:
*         description: Thành công. Trả về thông tin sản phẩm
*       404:
*         description: Không tìm thấy sản phẩm theo ID.
*/
router.get('/product/:id', (req, res) => {ProductController.getProductById(req, res);});
/**
 * @swagger
 * /data/product:
 *   post:
 *     tags: [Product]
 *     description: Tạo mới sản phẩm và thông tin sản phẩm
 *     parameters:
 *      - name: id
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: name
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_image
 *        description: Ảnh sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: category_id
 *        description: ID category
 *        in: formData
 *        required: true
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
router.post('/product', (req, res) => {ProductController.createProduct(req, res);});
/**
 * @swagger
 * /data/product/{id}:
 *   put:
 *     tags: [Product]
 *     description: Chỉnh sửa thông tin sản phẩm
 *     parameters:
 *      - name: id
 *        description: ID địa chỉ
 *        in: path
 *        required: true
 *        type: integer
 *      - name: name
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_image
 *        description: Ảnh sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: category_id
 *        description: ID category
 *        type: integer
 *        in: formData
 *        required: true
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
router.put('/product/:id', (req, res) => {ProductController.updateProduct(req, res);});
/**
* @swagger
* /data/product/{id}:
*   delete:
*     tags: [Product]
*     summary: Xóa thông tin sản phẩm
*     description: Xóa thông tin sản phẩm dựa trên ID được cung cấp.
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
router.delete('/product/:id', (req, res) => {ProductController.deleteProduct(req, res);});

// Shopping Cart Controller
/**
 * @swagger
 * /data/shopping-cart:
 *  get:
 *      tags: [Shopping Cart]
 *      summary: Lấy danh sách giỏ hàng
 *      description: Trả về danh sách tất cả các giỏ hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin giỏ hàng
 *          500:
 *              description: Lỗi máy chủ nội bộ
 * 
 */
router.get('/shopping-cart', (req, res) => {ShoppingCartController.getAllShoppingCarts(req, res);});
/**
* @swagger
* /data/shopping-cart/{id}:
*   get:
*     tags: [Shopping Cart]
*     summary: Lấy thông tin giỏ hàng theo ID
*     description: Trả về thông tin dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của giỏ hàng
*     responses:
*       200:
*         description: Thành công. Trả về thông tin giỏ hàng
*       404:
*         description: Không tìm thấy giỏ hàng theo ID.
*/
router.get('/shopping-cart/:id', (req, res) => {ShoppingCartController.getShoppingCartsByUserID(req, res);});
/**
 * @swagger
 * /data/shopping-cart:
 *   post:
 *     tags: [Shopping Cart]
 *     description: Tạo mới sản phẩm và thông tin sản phẩm
 *     parameters:
 *      - name: id
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: email
 *        description: Email người dùng tương ứng
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
router.post('/shopping-cart', (req, res) => {ShoppingCartController.createShoppingCart(req, res);});
// Has a bug need to fix
/**
 * @swagger 
 * /data/shopping-cart:
 *   put:
 *     tags: [Shopping Cart]
 *     description: Tạo mới sản phẩm và thông tin sản phẩm
 *     parameters:
 *      - name: id
 *        description: ID giỏ hàng
 *        in: path
 *        required: true
 *        type: integer
 *      - name: email
 *        description: Email người dùng tương ứng
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
router.put('/shopping-cart/:id', (req, res) => {ShoppingCartController.updateShoppingCart(req, res);});

//Variation Controller

/**
 * @swagger
 * /data/variation:
 *  get:
 *      tags: [Variation]
 *      summary: Lấy danh sách dữ liệu
 *      description: Trả về danh sách tất cả danh sách dữ liệu
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên variation
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */
router.get('/variation', (req, res) => {VariationController.getAllVariation(req, res);});

/**
* @swagger
* /data/variation/{id}:
*   get:
*     tags: [Variation]
*     summary: Lấy thông tin variation theo ID
*     description: Trả về thông tin variation dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của variation
*     responses:
*       200:
*         description: Thành công. Trả về thông tin variation.
*       404:
*         description: Không tìm thấy variation theo ID.
*/
router.get('/variation/:id', (req, res) => {VariationController.getVariationByID(req, res)})
router.post('/variation', (req, res) => {VariationController.createVariation(req, res);});
router.put('/variation/:id', (req, res) => {VariationController.updateVariation(req, res);});
router.delete('/variation/:id', (req, res) => {VariationController.deleteVariation(req, res);});

// userPaymentMethod Controller
router.get('/user-payment-method', (req, res) => {userPaymentMethodController.getAllUserPaymentMethod(req, res);});
/**
 * @swagger
 * /data/variation:
 *   post:
 *     tags: [Variation]
 *     description: Tạo mới danh mục variation
 *     parameters:
 *      - name: id
 *        description: ID danh mục variation
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: category_name
 *        description: ID
 *        in: formData
 *        required: true
 *        type: number
 *      - name: name
 *        description: Tên được biến đổi
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục variation đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/variation', (req, res) => {VariationController.createVariation(req, res);});

// promotionCategory Controller
router.get('/promotion-category', (req, res) => {promotionCategoryController.getAllPromotionCategory(req, res);});
router.get('/promotion-category/:id', (req, res) => {promotionCategoryController.getPromotionCategoryById(req, res);});
router.post('/promotion-category', (req, res) => {promotionCategoryController.createPromotionCategory(req, res);});
router.put('/promotion-category/:id', (req, res) => {promotionCategoryController.updatePromotionCategory(req, res);});
/**
 * @swagger
 * /data/varation/{id}:
 *   put:
 *     tags: [Variation]
 *     description: Sửa danh mục variation
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục variation
 *      - name: category_name
 *        description: Tên danh mục variation
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name
 *        description: Tên danh mục mới
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục variation đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/variation/:id', (req, res) => {VariationController.updateVariation(req, res);});

/**
* @swagger
* /data/variation/{id}:
*   delete:
*     tags: [Variation]
*     summary: Xóa danh mục
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/variation/:id', (req, res) => {VariationController.deleteVariation(req, res);});

// userPaymentMethod Controller
/**
 * @swagger
 * /data/user-payment-method:
 *  get:
 *      tags: [User Payment Method]
 *      summary: Lấy danh sách phương thức thanh toán
 *      description: Trả về danh sách tất cả danh sách phương thức thanh toán
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/user-payment-method', (req, res) => {userPaymentMethodController.getAllUserPaymentMethod(req, res);});

// promotionCategory Controller

/**
 * @swagger
 * /data/promotion-category:
 *  get:
 *      tags: [Promotion Category]
 *      summary: Lấy danh sách dữ liệu danh mục khuyến mãi
 *      description: Trả về danh sách tất cả danh sách dữ liệu danh mục khuyến mãi
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên danh mục khuyến mãi
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/promotion-category', (req, res) => {promotionCategoryController.getAllPromotionCategory(req, res);});

/**
* @swagger
* /data/promotion-category/{id}:
*   get:
*     tags: [Promotion Category]
*     summary: Lấy thông tin danh mục promotion theo category_id
*     description: Trả về thông tin danh mục promotion dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục promotion
*     responses:
*       200:
*         description: Thành công. Trả về thông tin danh mục promotion.
*       404:
*         description: Không tìm thấy danh mục promotion theo ID.
*/
router.get('/promotion-category/:id', (req, res) => {promotionCategoryController.getPromotionCategoryById(req, res);});

/**
 * @swagger
 * /data/promotion-category:
 *   post:
 *     tags: [Promotion Category]
 *     description: Tạo mới danh mục Promotion Category
 *     parameters:
 *      - name: promotion_name
 *        description: tên danh mục khuyến mãi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: category_id
 *        description: ID danh mục khuyến mãi
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Promotion Category đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/promotion-category', (req, res) => {promotionCategoryController.createPromotionCategory(req, res);});

/**
 * @swagger
 * /data/promotion-category/{id}:
 *   put:
 *     tags: [Promotion Category]
 *     description: Sửa danh mục Promotion Category
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục Promotion Category
 *      - name: promotion_name
 *        description: tên danh mục khuyến mãi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: category_id
 *        description: ID danh mục khuyến mãi
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Promotion Category đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/promotion-category/:id', (req, res) => {promotionCategoryController.updatePromotionCategory(req, res);});

/**
* @swagger
* /data/promotion-category/{id}:
*   delete:
*     tags: [Promotion Category]
*     summary: Xóa danh mục Promotion Category
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/promotion-category/:id', (req, res) => {promotionCategoryController.deletePromotionCategory(req, res);});

/// Table with reference lv3
// VariationOption Controller

/**
 * @swagger
 * /data/variation-option:
 *  get:
 *      tags: [Variation Option]
 *      summary: Lấy danh sách dữ liệu tuỳ chỉnh biến đổi
 *      description: Trả về danh sách tất cả danh sách dữ liệu 
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/variation-option', (req, res) => {VariationOptionController.getAllVariationOption(req, res);});

/**
* @swagger
* /data/variation-option/{id}:
*   get:
*     tags: [Variation Option]
*     summary: Lấy thông tin dữ liệu  theo ID
*     description: Trả về thông tin dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của sản phẩm
*     responses:
*       200:
*         description: Thành công. Trả về thông tin.
*       404:
*         description: Không tìm thấy theo ID.
*/
router.get('/variation-option/:id', (req, res) => {VariationOptionController.getVariationOptionID(req, res)})

/**
 * @swagger
 * /data/variation-option:
 *   post:
 *     tags: [Variation Option]
 *     description: Tạo mới danh mục Variation Option
 *     parameters:
 *      - name: variation_id
 *        description: ID danh mục
 *        in: formData
 *        required: true
 *        type: string
 *      - name: variation_name
 *        description: Tên sự biến đổi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: value
 *        description: giá trị
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Variation Option đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/variation-option', (req, res) => {VariationOptionController.createVariationOption(req, res);});

/**
 * @swagger
 * /data/variation-option/{id}:
 *   put:
 *     tags: [Variation Option]
 *     description: Sửa danh mục Variation Option
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục Variation Option
 *      - name: variation_id
 *        description: ID danh mục
 *        in: formData
 *        required: true
 *        type: string
 *      - name: variation_name
 *        description: Tên sự biến đổi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: value
 *        description: giá trị
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Variation Option đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/variation-option/:id', (req, res) => {VariationOptionController.updateVariationOption(req, res);});

// Product Item Controller

/**
 * @swagger
 * /data/product-item:
 *  get:
 *      tags: [Product Item]
 *      summary: Lấy danh sách dữ liệu sản phẩm
 *      description: Trả về danh sách tất cả danh sách dữ liệu sản phẩm
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên sản phẩm
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/product-item', (req, res) => {ProductItemController.getAllProductItem(req, res);});

/**
* @swagger
* /data/product-item/{id}:
*   get:
*     tags: [Product Item]
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
router.get('/product-item/:id', (req, res) => {ProductItemController.getProductItemByID(req, res);});

/**
 * @swagger
 * /data/product-item:
 *   post:
 *     tags: [Product Item]
 *     description: Tạo mới sản phẩm
 *     parameters:
 *      - name: product_name
 *        description: Tên sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: SKU
 *        description: SKU
 *        in: formData
 *        required: true
 *        type: number
 *      - name: quantity_in_stock
 *        description: chất lượng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: price
 *        description: giá cả
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Promotion Category đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/product-item', (req, res) => {ProductItemController.createProductItem(req, res);});

/**
 * @swagger
 * /data/product-item/{id}:
 *   put:
 *     tags: [Product Item]
 *     description: Sửa danh mục Product Item
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục Product Item
 *      - name: product_name
 *        description: Tên sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: SKU
 *        description: SKU
 *        in: formData
 *        required: true
 *        type: number
 *      - name: quantity_in_stock
 *        description: chất lượng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: price
 *        description: giá cả
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Product Item đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/product-item/:id', (req, res) => {ProductItemController.updateProductItem(req, res);});//, jwtUtil.verifyAccessToken, jwtUtil.verifyAdminRole

/**
* @swagger
* /data/product-item/{id}:
*   delete:
*     tags: [Product Item]
*     summary: Xóa danh mục Product Item
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/product-item/:id', (req, res) => {ProductItemController.deleteProductItem(req, res);});

// User Address Controller

/**
 * @swagger
 * /data/user-address:
 *  get:
 *      tags: [User Address]
 *      summary: Lấy danh sách dữ liệu địa chỉ khách hàng
 *      description: Trả về danh sách tất cả danh sách dữ liệu địa chỉ khách hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin trên địa chỉ khách hàng
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/user-address', (req, res) => {UserAddressController.getAllUserAddress(req, res);});

/**
* @swagger
* /data/user-address/{id}:
*   get:
*     tags: [User Address]
*     summary: Lấy thông tin địa chỉ khách hàng theo ID
*     description: Trả về thông tin địa chỉ khách hàng dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của địa chỉ khách hàng
*     responses:
*       200:
*         description: Thành công. Trả về thông tin địa chỉ khách hàng.
*       404:
*         description: Không tìm thấy địa chỉ khách hàng theo ID.
*/
router.get('/user-address/:id', (req, res) => {UserAddressController.getUserAddressByID(req, res);});

/**
 * @swagger
 * /data/user-address:
 *   post:
 *     tags: [User Address]
 *     description: Tạo mới User Address
 *     parameters:
 *      - name: user_id
 *        description: ID khách hàng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: address_id
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: number
 *      - name: is_default
 *        description: default
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: User Address đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/user-address', (req, res) => {UserAddressController.createUserAddress(req, res);});

/**
 * @swagger
 * /data/user-address/{id}:
 *   put:
 *     tags: [User Address]
 *     description: Sửa danh mục địa chỉ khách hàng
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục địa chỉ khách hàng
 *      - name: user_id
 *        description: ID khách hàng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: address_id
 *        description: ID địa chỉ
 *        in: formData
 *        required: true
 *        type: number
 *      - name: is_default
 *        description: default
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục địa chỉ khách hàng đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/user-address/:id', (req, res) => {UserAddressController.updateUserAddress(req, res);});

/**
* @swagger
* /data/user-address/{id}:
*   delete:
*     tags: [User Address]
*     summary: Xóa danh mục địa chỉ khách hàng
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/user-address/:id', (req, res) => {UserAddressController.deleteUserAddress(req, res);});

// Shop Order Controller

/**
 * @swagger
 * /data/shop-order:
 *  get:
 *      tags: [Shop Order]
 *      summary: Lấy danh sách phương thức thanh toán Shop
 *      description: Trả về danh sách tất cả danh sách phương thức thanh toán Shop
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/shop-order', (req, res) => {shopOrderController.getAllShopOrder(req, res);});

/**
* @swagger
* /data/shop-order/{id}:
*   get:
*     tags: [Shop Order]
*     summary: Lấy thông tin phương thức theo ID
*     description: Trả về thông tin phương thức dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của phương thức
*     responses:
*       200:
*         description: Thành công. Trả về thông tin phương thức.
*       404:
*         description: Không tìm thấy phương thức theo ID.
*/
router.get('/shop-order/:id', (req, res) => {shopOrderController.getShopOrderByID(req, res);});

/**
 * @swagger
 * /data/shop-order:
 *   post:
 *     tags: [Shop Order]
 *     description: Tạo mới danh mục Shop Order
 *     parameters:
 *      - name: user_id
 *        description: ID user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: order_date
 *        description: ngày order
 *        in: formData
 *        required: true
 *        type: string
 *      - name: order_total
 *        description: tổng order
 *        in: formData
 *        required: true
 *        type: number
 *      - name: payment_method_id
 *        description: ID phương thức thanh toán
 *        in: formData
 *        required: true
 *        type: number
 *      - name: shipping_address
 *        description: địa chỉ giao hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: shipping_method
 *        description: phương thức vận chuyển
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Shop Order đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/shop-order', (req, res) => {shopOrderController.createShopOrder(req, res);});

/**
 * @swagger
 * /data/shop-order/{id}:
 *   put:
 *     tags: [Shop Order]
 *     description: Sửa danh mục Shop Order
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục Shop Order
 *      - name: user_id
 *        description: ID user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: order_date
 *        description: ngày order
 *        in: formData
 *        required: true
 *        type: string
 *      - name: order_total
 *        description: tổng order
 *        in: formData
 *        required: true
 *        type: number
 *      - name: payment_method_id
 *        description: ID phương thức thanh toán
 *        in: formData
 *        required: true
 *        type: number
 *      - name: shipping_address
 *        description: địa chỉ giao hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: shipping_method
 *        description: phương thức vận chuyển
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Shop Order đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/shop-order/:id', (req, res) => {shopOrderController.updateShopOrder(req, res);});

/// Table with reference lv4
// Order Line Controller

/**
 * @swagger
 * /data/order-line:
 *  get:
 *      tags: [Order Line]
 *      summary: Lấy danh sách đơn đặt hàng
 *      description: Trả về danh sách tất cả danh sách đơn đặt hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/order-line', (req, res) => {OrderLineController.getAllOrderLine(req, res);});

/**
* @swagger
* /data/order-line/{id}:
*   get:
*     tags: [Order Line]
*     summary: Lấy thông tin đơn đặt hàng theo ID
*     description: Trả về thông tin đơn đặt hàng dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của đơn đặt hàng
*     responses:
*       200:
*         description: Thành công. Trả về thông tin đơn đặt hàng.
*       404:
*         description: Không tìm thấy giỏ hàng theo ID.
*/
router.get('/order-line/:id', (req, res) => {OrderLineController.getOrderLineByID(req, res);});

/**
 * @swagger
 * /data/order-line:
 *   post:
 *     tags: [Order Line]
 *     description: Tạo mới danh mục Order Line
 *     parameters:
 *      - name: order_id
 *        description: ID đơn đặt hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_item_id
 *        description: ID sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: quantity
 *        description: số lượng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: price
 *        description: giá trị
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Order Line đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/order-line', (req, res) => {OrderLineController.createOrderLine(req, res);});//, jwtUtil.verifyAccessToken, jwtUtil.verifyAdminRole

/**
 * @swagger
 * /data/order-line/{id}:
 *   put:
 *     tags: [Order Line]
 *     description: Tạo mới danh mục Order Line
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của đơn đặt
 *      - name: order_id
 *        description: ID đơn đặt hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_item_id
 *        description: ID sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: quantity
 *        description: số lượng
 *        in: formData
 *        required: true
 *        type: number
 *      - name: price
 *        description: giá trị
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Order Line đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/order-line/:id', (req, res) => {OrderLineController.updateOrderLine(req, res);});

// Shopping Cart Item Controller

/**
 * @swagger
 * /data/shopping-cart-item:
 *  get:
 *      tags: [Shopping Cart Item]
 *      summary: Lấy danh sách giỏ hàng
 *      description: Trả về danh sách tất cả danh sách giỏ hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/shopping-cart-item', (req, res) => {ShoppingCartItemController.getAllShoppingCartItem(req, res);});

/**
* @swagger
* /data/shopping-cart-item/{id}:
*   get:
*     tags: [Shopping Cart Item]
*     summary: Lấy thông tin giỏ hàng theo ID
*     description: Trả về thông tin giỏ hàng dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của giỏ hàng
*     responses:
*       200:
*         description: Thành công. Trả về thông tin giỏ hàng.
*       404:
*         description: Không tìm thấy giỏ hàng theo ID.
*/
router.get('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.getShoppingCartItemByID(req, res);});

/**
 * @swagger
 * /data/shopping-cart-item:
 *   post:
 *     tags: [Shopping Cart Item]
 *     description: Tạo mới danh mục Shopping Cart Item
 *     parameters:
 *      - name: user_id
 *        description: ID khách hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_item_id
 *        description: ID sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: quantity
 *        description: số lượng
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Shopping Cart Item đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/shopping-cart-item', (req, res) => {ShoppingCartItemController.createShoppingCartItem(req, res);});   

/**
 * @swagger
 * /data/shopping-cart-item/{id}:
 *   put:
 *     tags: [Shopping Cart Item]
 *     description: Tạo mới danh mục Shopping Cart Item
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của giỏ hàng
 *      - name: user_id
 *        description: ID khách hàng
 *        in: formData
 *        required: true
 *        type: string
 *      - name: product_item_id
 *        description: ID sản phẩm
 *        in: formData
 *        required: true
 *        type: string
 *      - name: quantity
 *        description: số lượng
 *        in: formData
 *        required: true
 *        type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục Shopping Cart Item đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.updateShoppingCartItem(req, res);});

/**
* @swagger
* /data/shopping-cart-item/{id}:
*   delete:
*     tags: [Shopping Cart Item]
*     summary: Xóa danh mục địa chỉ giỏ hàng
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/shopping-cart-item/:id', (req, res) => {ShoppingCartItemController.deleteShoppingCartItem(req, res);});

// Product Config Controller

router.get('/product-config', (req, res) => {ProductConfigController.getAllProductConfig(req, res);});
router.post('/product-config', (req, res) => {ProductConfigController.createProductConfig(req, res);});
router.put('/product-config/:id', (req, res) => {ProductConfigController.updateProductConfig(req, res);});
router.delete('/product-config/:id', (req, res) => {ProductConfigController.deleteProductConfig(req, res);});

/// Table with reference lv5
// User Review
/**
 * @swagger
 * /data/user-review:
 *  get:
 *      tags: [User Review]
 *      summary: Lấy danh sách bình luận của khách hàng
 *      description: Trả về danh sách tất cả danh sách bình luận của khách hàng
 *      responses:
 *          200:
 *              description: Thành công, trả về thông tin
 *          500:
 *              description: Lỗi hệ thống! 
 * 
 */ 
router.get('/user-review', (req, res) => {UserReviewController.getAllUserReview(req, res);});

/**
* @swagger
* /data/user-review/{id}:
*   get:
*     tags: [User Review]
*     summary: Lấy thông tin dữ liệu theo ID
*     description: Trả về thông tin dữ liệu dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của phương thức
*     responses:
*       200:
*         description: Thành công. Trả về thông tin phương thức.
*       404:
*         description: Không tìm thấy dữ liệu theo ID.
*/
router.get('/user-review/:id', (req, res) => {UserReviewController.getUserReviewByID(req, res);});

/**
 * @swagger
 * /data/user-review:
 *   post:
 *     tags: [User Review]
 *     description: Tạo mới danh mục User Review
 *     parameters:
 *      - name: user_id
 *        description: ID user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: ordered_product_id
 *        description: ngày order
 *        in: formData
 *        required: true
 *        type: string
 *      - name: rating
 *        description: đánh giá
 *        in: formData
 *        required: true
 *        type: string
 *      - name: payment_method_id
 *        description: ID phương thức thanh toán
 *        in: formData
 *        required: true
 *        type: string
 *      - name: comment
 *        description: bình luận
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục User Review đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/user-review', (req, res) => {UserReviewController.createUserReview(req, res);});

/**
 * @swagger
 * /data/user-review/{id}:
 *   put:
 *     tags: [User Review]
 *     description: Sửa danh mục User Review
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: string
 *            description: ID của danh mục User Review
 *      - name: user_id
 *        description: ID user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: ordered_product_id
 *        description: ngày order
 *        in: formData
 *        required: true
 *        type: string
 *      - name: rating
 *        description: đánh giá
 *        in: formData
 *        required: true
 *        type: string
 *      - name: payment_method_id
 *        description: ID phương thức thanh toán
 *        in: formData
 *        required: true
 *        type: string
 *      - name: comment
 *        description: bình luận
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request 
 *       409:
 *         description: Danh mục User Review đã tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/user-review/:id', (req, res) => {UserReviewController.updateUserReview(req, res);});

/**
* @swagger
* /data/user-review/{id}:
*   delete:
*     tags: [User Review]
*     summary: Xóa danh mục bình luận khách hàng
*     description: Xóa danh mục dựa trên ID được cung cấp.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID của danh mục
*     responses:
*       204:
*         description: Xóa thành công, không có dữ liệu trả về.
*       404:
*         description: Không tìm thấy theo ID.
*       500:
*         description: Lỗi máy chủ nội bộ.
*/
router.delete('/user-review/:id', (req, res) => {UserReviewController.deleteUserReview(req, res);});

module.exports = router;