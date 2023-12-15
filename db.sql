-- arquivo mysql:

create database brecho_brepro;

CREATE TABLE  brecho_brepro.produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productCode VARCHAR(255) NOT NULL,
    product VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
   perPrice DECIMAL(10, 2) NOT NULL
);
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';
FLUSH PRIVILEGES;
USE brecho_brepro;
SELECT * FROM produtos;
ALTER TABLE produtos
DROP COLUMN id;


