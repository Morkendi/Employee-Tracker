-- Delete Database to avoid conflicts
DROP DATABASE IF EXISTS employeeDB;

-- Create and use new Database
CREATE DATABASE employeeDB;
USE employeeDB;

-- Create Tables

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL (10, 2) NOT NULL ,
    department_id INT
    -- FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (25) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT
    -- FOREIGN KEY (role_id) REFERENCES role(id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);