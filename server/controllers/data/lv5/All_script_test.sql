# LV1 test
SELECT * FROM country;
SELECT * FROM country WHERE id = :id;
INSERT INTO country (id, country_name) VALUES (:id, :country_name);

SELECT * FROM order_status;

SELECT * FROM payment_type;

UPDATE payment_type SET value = :type_name WHERE id = :id;

SELECT * FROM product_category;

SELECT * FROM product_category WHERE id = :id;

INSERT INTO product_category (id, category_name) VALUES (:id, :category_name);

UPDATE product_category SET category_name = :category_name WHERE id = :id;

SELECT * FROM promotion WHERE end_date < current_date;

INSERT INTO promotion (id, name, description, start_date, end_date, discount_rate) VALUES (:id, :name, :description, :start_date, :end_date, :discount_rate);

SELECT * FROM shipping_method WHERE id = :id;

# LV2 test
SELECT product.*, product_category.category_name FROM product INNER JOIN product_category ON product.category_id = product_category.id WHERE product.id = :id;

SELECT shopping_cart.*, site_user.email_address FROM shopping_cart INNER JOIN site_user ON shopping_cart.user_id = site_user.id WHERE shopping_cart.user_id = :id LIMIT 1;

SELECT user_payment_method.*, payment_type.value FROM user_payment_method INNER JOIN payment_type ON user_payment_method.payment_type_id = payment_type.id WHERE user_payment_method.id = :id;

SELECT variation.*, product_category.category_name FROM variation INNER JOIN product_category ON variation.category_id = product_category.id ORDER BY id;

SELECT variation.*, product_category.category_name FROM variation INNER JOIN product_category ON variation.category_id = product_category.id WHERE variation.id = :id;

INSERT INTO variation (id, category_id, name) SELECT :id, pc.id, :name FROM product_category pc WHERE pc.category_name = :category_name;
# LV3 test
SELECT product_item.*, product.name, product.description, product_category.category_name FROM product_item INNER JOIN product ON product_item.product_id = product.id INNER JOIN product_category ON product.category_id = product_category.id;

SELECT product_item.*, product.name, product.description, product_category.category_name FROM product_item INNER JOIN product ON product_item.product_id = product.id INNER JOIN product_category ON product.category_id = product_category.id WHERE product_item.id = :id;

INSERT INTO product_item (id, product_id, SKU, quantity_in_stock, price) SELECT :id, p.id, :SKU, :quantity_in_stock, :price FROM product p WHERE p.name = :product_name LIMIT 1;

UPDATE product_item SET product_id = (SELECT p.id FROM product p WHERE p.name = :product_name LIMIT 1), SKU = :SKU, quantity_in_stock = :quantity_in_stock, price = :price WHERE id = :id;

DELETE FROM product_item WHERE id = :id;

SELECT so.id, so.user_id, so.order_date, so.order_total, so.payment_method_id, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, so.shipping_method, upm.provider, upm.account_number, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status
FROM shop_order AS so
JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
JOIN address AS sa ON so.shipping_address = sa.id
JOIN shipping_method AS sm ON so.shipping_method = sm.id
JOIN order_status AS os ON so.order_status = os.id
JOIN country AS c ON sa.country_id = c.id;

SELECT so.id, so.user_id, so.order_date, so.order_total, so.payment_method_id, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, so.shipping_method, upm.provider, upm.account_number, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status
FROM shop_order AS so
JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
JOIN address AS sa ON so.shipping_address = sa.id
JOIN shipping_method AS sm ON so.shipping_method = sm.id
JOIN order_status AS os ON so.order_status = os.id
JOIN country AS c ON sa.country_id = c.id WHERE so.id = :id;

INSERT INTO shop_order (id, user_id, order_date, order_total, order_status, payment_method_id, shipping_address, shipping_method) VALUES (:id, :user_id, :order_date, :order_total, :order_status, :payment_method_id, :shipping_address, :shipping_method);

SELECT vo.id, vo.variation_id, vo.value, v.name AS variation_name, pc.category_name AS category_name FROM variation_option AS vo JOIN variation AS v ON vo.variation_id = v.id JOIN product_category AS pc ON v.category_id = pc.id;

SELECT vo.id, vo.variation_id, vo.value, v.name AS variation_name, pc.category_name AS category_name FROM variation_option AS vo JOIN variation AS v ON vo.variation_id = v.id JOIN product_category AS pc ON v.category_id = pc.id WHERE vo.id = :id;

INSERT INTO variation_option (id, variation_id, value) VALUES (:id, (SELECT id FROM variation WHERE name = :variation_name LIMIT 1), :value);

UPDATE variation_option SET variation_id = (SELECT id FROM variation WHERE name = :variation_name LIMIT 1), value = :value WHERE id = :id;

# LV4 Test
SELECT ol.id, ol.order_id, ol.product_item_id, ol.quantity, ol.price, p.name AS product_name, pc.category_name AS product_category, upm.provider AS payment_provider, upm.account_number AS payment_account, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status FROM order_line AS ol JOIN product_item AS pi ON ol.product_item_id = pi.id JOIN product AS p ON pi.product_id = p.id JOIN product_category AS pc ON p.category_id = pc.id JOIN shop_order AS so ON ol.order_id = so.id JOIN user_payment_method AS upm ON so.payment_method_id = upm.id JOIN address AS sa ON so.shipping_address = sa.id JOIN shipping_method AS sm ON so.shipping_method = sm.id JOIN order_status AS os ON so.order_status = os.id JOIN country AS c ON sa.country_id = c.id;

SELECT ol.id, ol.order_id, ol.product_item_id, ol.quantity, ol.price, p.name AS product_name, pc.category_name AS product_category, upm.provider AS payment_provider, upm.account_number AS payment_account, CONCAT(sa.street_number, ' ', sa.address_line1, ', ', sa.address_line2, ', ', sa.city, ', ', c.country_name) AS shipping_address, sm.name AS shipper, sm.price AS shipping_fee, os.status AS order_status FROM order_line AS ol JOIN product_item AS pi ON ol.product_item_id = pi.id JOIN product AS p ON pi.product_id = p.id JOIN product_category AS pc ON p.category_id = pc.id JOIN shop_order AS so ON ol.order_id = so.id JOIN user_payment_method AS upm ON so.payment_method_id = upm.id JOIN address AS sa ON so.shipping_address = sa.id JOIN shipping_method AS sm ON so.shipping_method = sm.id JOIN order_status AS os ON so.order_status = os.id JOIN country AS c ON sa.country_id = c.id WHERE ol.id = :id;

INSERT INTO order_line (id, order_id, product_item_id, quantity, price) VALUES (:id, :order_id, :product_item_id, :quantity, :price);

UPDATE order_line SET order_id = ( SELECT id FROM shop_order WHERE id = :order_id ), product_item_id = ( SELECT id FROM product_item WHERE id = :product_item_id LIMIT 1 ), quantity = :quantity, price = :price WHERE id = :id;

DELETE FROM order_line WHERE id = :id;

SELECT sci.id, sci.cart_id, sci.product_item_id, sci.quantity, sc.user_id, p.name AS product_name, pc.category_name AS product_category, u.email_address FROM shopping_cart_item AS sci JOIN product_item AS pi ON sci.product_item_id = pi.id
    JOIN product AS p ON pi.product_id = p.id
    JOIN product_category AS pc ON p.category_id = pc.id
    JOIN shopping_cart AS sc ON sci.cart_id = sc.id
    JOIN site_user AS u ON sc.user_id = u.id;

SELECT sci.id, sci.cart_id, sci.product_item_id, sci.quantity, sc.user_id, p.name AS product_name, pc.category_name AS product_category, u.email_address FROM shopping_cart_item AS sci JOIN product_item AS pi ON sci.product_item_id = pi.id
    JOIN product AS p ON pi.product_id = p.id
    JOIN product_category AS pc ON p.category_id = pc.id
    JOIN shopping_cart AS sc ON sci.cart_id = sc.id
    JOIN site_user AS u ON sc.user_id = u.id
    WHERE sci.id = :id;

INSERT INTO shopping_cart_item (id, product_item_id, quantity, cart_id ) VALUES (:id, :product_item_id, :quantity, (SELECT id FROM shopping_cart WHERE user_id = :user_id LIMIT 1));

UPDATE shopping_cart_item SET product_item_id = :product_item_id, quantity = :quantity, cart_id = :cart_id WHERE id = :id;

DELETE FROM shopping_cart_item WHERE id = :id;

# LV5 Test
SELECT
    ur.id,
    ur.user_id,
    ur.ordered_product_id,
    ur.rating,
    ur.comment,
    p.name AS product_name,
    pc.category_name AS product_category,
    upm.provider AS payment_provider,
    upm.account_number AS payment_account,
    CONCAT(a.street_number, ' ', a.address_line1, ', ', a.address_line2, ', ', a.city, ', ', c.country_name) AS shipping_address,
    sm.name AS shipper,
    sm.price AS shipping_fee,
    os.status AS order_status,
    u.email_address AS email_address
FROM
    user_review AS ur
    LEFT JOIN order_line AS ol ON ur.ordered_product_id = ol.id
    LEFT JOIN product_item AS pi ON ol.product_item_id = pi.id
    LEFT JOIN product AS p ON pi.product_id = p.id
    LEFT JOIN product_category AS pc ON p.category_id = pc.id
    LEFT JOIN shop_order AS so ON ol.order_id = so.id
    LEFT JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
    LEFT JOIN address AS a ON so.shipping_address = a.id
    LEFT JOIN country AS c ON a.country_id = c.id
    LEFT JOIN shipping_method AS sm ON so.shipping_method = sm.id
    LEFT JOIN order_status AS os ON so.order_status = os.id
    LEFT JOIN site_user AS u ON ur.user_id = u.id;

SELECT
    ur.id,
    ur.user_id,
    ur.ordered_product_id,
    ur.rating,
    ur.comment,
    p.name AS product_name,
    pc.category_name AS product_category,
    upm.provider AS payment_provider,
    upm.account_number AS payment_account,
    CONCAT(a.street_number, ' ', a.address_line1, ', ', a.address_line2, ', ', a.city, ', ', c.country_name) AS shipping_address,
    sm.name AS shipper,
    sm.price AS shipping_fee,
    os.status AS order_status,
    u.email_address AS email_address
FROM
    user_review AS ur
    LEFT JOIN order_line AS ol ON ur.ordered_product_id = ol.id
    LEFT JOIN product_item AS pi ON ol.product_item_id = pi.id
    LEFT JOIN product AS p ON pi.product_id = p.id
    LEFT JOIN product_category AS pc ON p.category_id = pc.id
    LEFT JOIN shop_order AS so ON ol.order_id = so.id
    LEFT JOIN user_payment_method AS upm ON so.payment_method_id = upm.id
    LEFT JOIN address AS a ON so.shipping_address = a.id
    LEFT JOIN country AS c ON a.country_id = c.id
    LEFT JOIN shipping_method AS sm ON so.shipping_method = sm.id
    LEFT JOIN order_status AS os ON so.order_status = os.id
    LEFT JOIN site_user AS u ON ur.user_id = u.id
WHERE
    ur.id = :id;

INSERT INTO user_review (id, user_id, ordered_product_id, rating, comment) VALUES (:id, :user_id, :ordered_product_id, :rating, :comment);

UPDATE user_review SET user_id = :user_id, ordered_product_id = :ordered_product_id, rating = :rating, comment = :comment WHERE id = :id;

DELETE FROM user_review WHERE id = :id;