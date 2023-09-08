CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce-mysql
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

drop TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL,
  `country_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `address`
--

drop TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL,
  `unit_number` int NOT NULL,
  `street_number` int NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_user_country` (`country_id`),
  CONSTRAINT `site_user_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_line`
--

drop TABLE IF EXISTS `order_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_line` (
  `id` int NOT NULL,
  `product_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_item_order_line` (`product_item_id`),
  KEY `shop_order_order_line` (`order_id`),
  CONSTRAINT `product_item_order_line` FOREIGN KEY (`product_item_id`) REFERENCES `product_item` (`id`),
  CONSTRAINT `shop_order_order_line` FOREIGN KEY (`order_id`) REFERENCES `shop_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_line`
--

LOCK TABLES `order_line` WRITE;
/*!40000 ALTER TABLE `order_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

drop TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_type`
--

drop TABLE IF EXISTS `payment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_type` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_type`
--

LOCK TABLES `payment_type` WRITE;
/*!40000 ALTER TABLE `payment_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

drop TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_product` (`category_id`),
  CONSTRAINT `product_category_product` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

drop TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL,
  `parent_category_id` int,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_config`
--

drop TABLE IF EXISTS `product_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_config` (
  `product_item_id` int NOT NULL,
  `variation_option_id` int NOT NULL,
  KEY `product_item_product_config` (`product_item_id`),
  KEY `variation_option_product_config` (`variation_option_id`),
  CONSTRAINT `product_item_product_config` FOREIGN KEY (`product_item_id`) REFERENCES `product_item` (`id`),
  CONSTRAINT `variation_option_product_config` FOREIGN KEY (`variation_option_id`) REFERENCES `variation_option` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_config`
--

LOCK TABLES `product_config` WRITE;
/*!40000 ALTER TABLE `product_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_item`
--

drop TABLE IF EXISTS `product_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_item` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `SKU` int NOT NULL,
  `quantity_in_stock` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_product_item` (`product_id`),
  CONSTRAINT `product_product_item` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_item`
--

LOCK TABLES `product_item` WRITE;
/*!40000 ALTER TABLE `product_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

drop TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `discount_rate` int NOT NULL,
  `start_date` date not null,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_category`
--

drop TABLE IF EXISTS `promotion_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_category` (
  `category_id` int NOT NULL,
  `promotion_id` int NOT NULL,
  KEY `promotion_category_product_category` (`category_id`),
  KEY `promotion_promotion_category` (`promotion_id`),
  CONSTRAINT `promotion_category_product_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`),
  CONSTRAINT `promotion_promotion_category` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_category`
--

LOCK TABLES `promotion_category` WRITE;
/*!40000 ALTER TABLE `promotion_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_method`
--

drop TABLE IF EXISTS `shipping_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_method` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_method`
--

LOCK TABLES `shipping_method` WRITE;
/*!40000 ALTER TABLE `shipping_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_order`
--

drop TABLE IF EXISTS `shop_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_order` (
  `id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_date` varchar(255) NOT NULL,
  `payment_method_id` int NOT NULL,
  `shipping_address` int NOT NULL,
  `shipping_method` int NOT NULL,
  `order_total` int NOT NULL,
  `order_status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_shop_order` (`shipping_address`),
  KEY `order_status_shop_order` (`order_status`),
  KEY `shipping_method_shop_order` (`shipping_method`),
  KEY `shop_order_user_payment_method` (`payment_method_id`),
  CONSTRAINT `address_shop_order` FOREIGN KEY (`shipping_address`) REFERENCES `address` (`id`),
  CONSTRAINT `order_status_shop_order` FOREIGN KEY (`order_status`) REFERENCES `order_status` (`id`),
  CONSTRAINT `shipping_method_shop_order` FOREIGN KEY (`shipping_method`) REFERENCES `shipping_method` (`id`),
  CONSTRAINT `shop_order_user_payment_method` FOREIGN KEY (`payment_method_id`) REFERENCES `user_payment_method` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_order`
--

LOCK TABLES `shop_order` WRITE;
/*!40000 ALTER TABLE `shop_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `shop_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

drop TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shopping_cart_site_user` (`user_id`),
  CONSTRAINT `shopping_cart_site_user` FOREIGN KEY (`user_id`) REFERENCES `site_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_item`
--

drop TABLE IF EXISTS `shopping_cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart_item` (
  `id` int NOT NULL,
  `cart_id` int NOT NULL,
  `product_item_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_item_shopping_cart_item` (`product_item_id`),
  KEY `shopping_cart_shopping_cart_item` (`cart_id`),
  CONSTRAINT `product_item_shopping_cart_item` FOREIGN KEY (`product_item_id`) REFERENCES `product_item` (`id`),
  CONSTRAINT `shopping_cart_shopping_cart_item` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_item`
--

LOCK TABLES `shopping_cart_item` WRITE;
/*!40000 ALTER TABLE `shopping_cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_user`
--

DROP TABLE IF EXISTS `site_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_user` (
  `id` int NOT NULL auto_increment,
  `email_address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_user`
--

LOCK TABLES `site_user` WRITE;
/*!40000 ALTER TABLE `site_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

drop TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `user_id` int NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `address_id` int NOT NULL,
  KEY `address_user_address` (`address_id`),
  KEY `user_address_site_user` (`user_id`),
  CONSTRAINT `address_user_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `user_address_site_user` FOREIGN KEY (`user_id`) REFERENCES `site_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_payment_method`
--

DROP TABLE IF EXISTS `user_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/*tranhiep*/;
CREATE TABLE `user_payment_method` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `payment_type_id` int NOT NULL,
  `provider` varchar(255) NOT NULL,
<<<<<<< HEAD
  `account_number` varchar(255) NOT NULL,
=======
  `account_number` VARCHAR(255) NOT NULL,
>>>>>>> e8ad21bcb676da01a2db1e0fd193657265f761af
  `is_default` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_type_user_payment_method` (`payment_type_id`),
  KEY `site_user_user_payment_method` (`user_id`),
  CONSTRAINT `payment_type_user_payment_method` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`id`),
  CONSTRAINT `site_user_user_payment_method` FOREIGN KEY (`user_id`) REFERENCES `site_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment_method`
--

LOCK TABLES `user_payment_method` WRITE;
/*!40000 ALTER TABLE `user_payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_review`
--

drop TABLE IF EXISTS `user_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_review` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `ordered_product_id` int NOT NULL,
  `rating` varchar(255) NOT NULL,
  `comment` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_line_user_review` (`ordered_product_id`),
  KEY `site_user_user_review` (`user_id`),
  CONSTRAINT `order_line_user_review` FOREIGN KEY (`ordered_product_id`) REFERENCES `order_line` (`id`),
  CONSTRAINT `site_user_user_review` FOREIGN KEY (`user_id`) REFERENCES `site_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_review`
--

LOCK TABLES `user_review` WRITE;
/*!40000 ALTER TABLE `user_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variation`
--

drop TABLE IF EXISTS `variation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variation` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_variation` (`category_id`),
  CONSTRAINT `product_category_variation` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variation`
--

LOCK TABLES `variation` WRITE;
/*!40000 ALTER TABLE `variation` DISABLE KEYS */;
/*!40000 ALTER TABLE `variation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variation_option`
--

drop TABLE IF EXISTS `variation_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variation_option` (
  `id` int NOT NULL,
  `variation_id` int NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `variation_variation_option` (`variation_id`),
  CONSTRAINT `variation_variation_option` FOREIGN KEY (`variation_id`) REFERENCES `variation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variation_option`
--

LOCK TABLES `variation_option` WRITE;
/*!40000 ALTER TABLE `variation_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `variation_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ecommerce-mysql'
--

--
-- Dumping routines for database 'ecommerce-mysql'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28  9:18:25





