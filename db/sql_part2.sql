/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dblab` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `dblab`;

# 2.1.
DROP TABLE IF EXISTS `khoa`;
CREATE TABLE `khoa` (
  `ma` varchar(4) NOT NULL,
  `ten` varchar(100) NOT NULL,
  PRIMARY KEY (`ma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# 2.2.
DROP TABLE IF EXISTS `sinhvien`;
create table `sinhvien` (
    `ma` int(10) not null,
    `ten` varchar(100) not null,
    `ngaysinh` date not null,
    `makhoa` varchar(4),
    `diachi` varchar(200),
    primary key (`ma`)
) engine=innodb default charset = latin1;
-- create foreign key with `makhoa` has refer `ma` in `khoa` table
alter table `sinhvien` add constraint `fk_sinhvien_khoa` foreign key (`makhoa`) references `khoa` (`ma`);


# 2.3.
alter table `sinhvien` add column  dienthoai varchar(20);

# 2.4.
alter table `sinhvien` modify column dienthoai varchar(50);

# 2.5.
ALTER TABLE sinhvien
ADD CONSTRAINT uc_sinhvien_ten_ngaysinh UNIQUE (ten, ngaysinh);
# check 2.5.

# 2.6.
create view view_sinhvien_koa as select * from sinhvien where makhoa = 'FZVR';

# 2.7.
GRANT INSERT ON dblab.* TO 'dblab.user02'@'192.168.0.0/255.255.255.0';

# 2.8.
create index idx_dienthoai on `sinhvien` (`dienthoai`);



