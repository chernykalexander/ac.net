-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+03:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `mgz_check`;
CREATE TABLE `mgz_check` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_pokupki` int(10) NOT NULL,
  `id_tovar` int(10) NOT NULL,
  `kolichestvo` int(5) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `mgz_check_fk0` (`id_pokupki`),
  KEY `mgz_check_fk1` (`id_tovar`),
  CONSTRAINT `mgz_check_fk0` FOREIGN KEY (`id_pokupki`) REFERENCES `mgz_pokupki` (`id`),
  CONSTRAINT `mgz_check_fk1` FOREIGN KEY (`id_tovar`) REFERENCES `mgz_tovar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `mgz_client`;
CREATE TABLE `mgz_client` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fio` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fio` (`fio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `mgz_magazine`;
CREATE TABLE `mgz_magazine` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `descr` varchar(50) NOT NULL,
  `adresphone` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descr` (`descr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `mgz_pokupki`;
CREATE TABLE `mgz_pokupki` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_client` int(10) NOT NULL,
  `id_magazine` int(10) NOT NULL,
  `data_pokupki` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mgz_pokupki_fk0` (`id_client`),
  KEY `mgz_pokupki_fk1` (`id_magazine`),
  CONSTRAINT `mgz_pokupki_fk0` FOREIGN KEY (`id_client`) REFERENCES `mgz_client` (`id`),
  CONSTRAINT `mgz_pokupki_fk1` FOREIGN KEY (`id_magazine`) REFERENCES `mgz_magazine` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `mgz_tovar`;
CREATE TABLE `mgz_tovar` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `descr` varchar(30) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `mgz_tovar_list`;
CREATE TABLE `mgz_tovar_list` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_magazine` int(10) NOT NULL,
  `id_tovar` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mgz_tovar_list_fk0` (`id_magazine`),
  KEY `mgz_tovar_list_fk1` (`id_tovar`),
  CONSTRAINT `mgz_tovar_list_fk0` FOREIGN KEY (`id_magazine`) REFERENCES `mgz_magazine` (`id`),
  CONSTRAINT `mgz_tovar_list_fk1` FOREIGN KEY (`id_tovar`) REFERENCES `mgz_tovar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2017-01-11 08:53:45