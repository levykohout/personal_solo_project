--user table

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(80) UNIQUE NOT NULL,
password varchar(120) NOT NULL
);

--inventory TABLE
CREATE TABLE inventory (
id SERIAL PRIMARY KEY,
category varchar(80),
sku_number int,
product_name varchar(80) NOT NULL,
quantity int NOT NULL,
date_bought date NOT NULL,
expiration_date date NOT NULL
);
