USE employeeDB

-- Insert Data
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary) VALUES
    ("Sales Lead", 100000.00),
    ("Salesperson", 80000.00),
    ("Lead Engineer", 150000.00),
    ("Software Engineer", 120000.00),
    ("Accountant", 125000.00),
    ("Legal Team Lead", 250000.00),
    ("Lawyer", 190000.00);

INSERT INTO employee (first_name, last_name) VALUES
    ('John', 'Doe'),
    ('Mike', 'Chan'),
    ('Ashley', 'Rodriguez'),
    ('Kevin', 'Tupik'),
    ('Malia', 'Brown'),
    ('Sarah', 'Lourd'),
    ('Tom', 'Allen'),
    ('Sam', 'Clemens'),
    ('Samantha', 'Jones');
