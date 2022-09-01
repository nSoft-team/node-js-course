USE Northwind;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(128) NOT NULL
) DEFAULT CHARSET = utf8;

INSERT INTO users VALUES(DEFAULT, 'Moishe', 'Ufnik', 'moshiko', '1234');
INSERT INTO users VALUES(DEFAULT, 'Kipi', 'Ben-Kipod', 'kipodi', 'abcd');
INSERT INTO users VALUES(DEFAULT, 'Ugi', 'Fletzet', 'ugifletzet', 'cool');

DROP TABLE IF EXISTS forum;
CREATE TABLE forum (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sender VARCHAR(100) NOT NULL,
	text VARCHAR(1000) NOT NULL
) DEFAULT CHARSET = utf8;

INSERT INTO forum VALUES(DEFAULT, 'Bart Simpson', 'Got to buy some of Northwind products...');
INSERT INTO forum VALUES(DEFAULT, 'Lisa Simpson', 'Where are Northwind employees today?');
INSERT INTO forum VALUES(DEFAULT, 'Lisa Simpson', 'Is it a real company?');