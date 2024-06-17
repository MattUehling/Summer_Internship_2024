CREATE DATABASE mydatabase;
USE mydatabase;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
INSERT INTO users (email, password) VALUES ('uehlingmatt@gmail.com', 'password');

select * from users