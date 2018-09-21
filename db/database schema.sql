DROP TABLE IF EXISTS users;

CREATE TABLE customer (
  customer_id INT PRIMARY KEY NOT NULL,
  phone VARCHAR(50) NOT NULL
);

CREATE TABLE menu_items (
  itemid INT PRIMARY KEY NOT NULL,
  itemname VARCHAR(50) NOT NULL,
  itemprice INT NOT NULL,
  itemdesc VARCHAR(50) NOT NULL,
  itemimgVARCHAR(50) NOT NULL
  
);