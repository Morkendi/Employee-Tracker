USE employeeDB

-- Insert Data
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
    ("Sales Lead", 100000.00, 1),
    ("Salesperson", 80000.00, 1),
    ("Lead Engineer", 150000.00, 2),
    ("Software Engineer", 120000.00, 2),
    ("Accountant", 125000.00, 3),
    ("Legal Team Lead", 250000.00, 4),
    ("Lawyer", 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Malia", "Brown", 2, 1),
    ("Sarah", "Lourd", 2, 1),
    ("Tom", "Allen", 5, NULL),
    ("Samantha", "Jones", 6, NULL),
    ("Tom","Cruise", 7, 6);
