//Requrie dependencies
const inquirer = require ('inquirer');
const mysql = require ('mysql2');
require ('dotenv').config();
const logo = require ('asciiart-logo');
const config = require ('./package.json');

// MySQL connection
const connectDB = mysql.createConnection({
    host: 'localhost',

    //MySQL Port
    port: 3306,

    //Database name
    database: process.env.DB_NAME,

    //MySQL username
    user: process.env.DB_USER,

    //MySQL password
    password:process.env.DB_PASSWORD,
});

//Connect to MySQL & Start Title
connectDB.connect((err) => {
    if (err) throw err
    const startText = 'This application will allow you to view and manage the departments, roles, and employees in your company.'
    console.log(logo({ 
        name: 'Employee Tracker',
        font: 'Doom',
        lineChars: 30,
        padding: 3,
        margin: 3,
        borderColor: 'green',
        logoColor: 'bold-green',
        textColor: 'gray', })
        .emptyLine()
        .center(startText)
        .render())
    startMenu();
});

//Initialize Inquirer
const startMenu = () => {
    inquirer.prompt([
        {
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                // Required actions
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                // Bonus actions
                "Delete Department",
                "Delete Role",
                "Delete Employee",
                // End Inquirer
                "End"
            ]
        }
    ])
    .then((answers) => {
        switch (answers.menu) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "End":
                connectDB.end();
                break;
        }
    })
};

const viewAllDepartments = () => {
    console.log('Viewing all departments\n');

    let query =`SELECT department.id AS ID, department.name AS "Department Name" FROM department`;

    connectDB.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);

        startMenu();
    });
};

const viewAllRoles = () => {
    console.log('Viewing all roles\n');

    let query =`SELECT role.id AS ID, 
                role.title AS Title,
                role.department_id AS DepartmentID,
                department.name AS Department,
                role.salary AS Salary
                FROM role, department
                WHERE department.id = role.department_id`;

    connectDB.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);

        startMenu();
    });
};

const viewAllEmployees = () => {
    console.log('Viewing all employees\n');

    let query =`SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS 'department', 
                role.salary
                FROM employee, role, department 
                WHERE department.id = role.department_id 
                AND role.id = employee.role_id
                ORDER BY employee.id ASC`;

    connectDB.query(query, (err, res) => {
        if (err) throw err;
            
        console.table(res);
            
        startMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'addDepartment',
            type: 'input',
            message: 'Enter the name of the new department:',
            validate: (input) => {
                if (!input) {
                    return 'Please enter a department name.';
                } else {
                    return true;
                }
            }
        }
    ])
    .then((answers) => {
        let query = `INSERT INTO department (name) VALUES (?)`;

        connectDB.query(query, [answers.addDepartment], (err, res) => {
            if (err) throw err;

            console.log('Department added successfully.');

            let newquery = `SELECT department.id AS ID, department.name AS "Department Name" FROM department`;
            connectDB.query(newquery, (err, res) => {
                if (err) throw err;

                console.table(res);
            });
            startMenu();
        });
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'addRole',
            type: 'input',
            message: 'What is the title of the new role?',
        },
        {
            name: 'addSalary',
            type: 'input',
            message: 'What is the salary of the new role?',
        },
        {
            name: 'addDepartment',
            type: 'input',
            message: 'What is the department ID of the new role?',
        }
    ])
    .then((answers) => {
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        let params = [answers.addRole, answers.addSalary, answers.addDepartment];

        connectDB.query(query, params, (err, res) => {
            if (err) throw err;

            console.log('Role added successfully.');

            let newquery = `SELECT role.id AS ID, 
                            role.title AS Title,
                            role.department_id AS DepartmentID,
                            department.name AS Department,
                            role.salary AS Salary
                            FROM role, department
                            WHERE department.id = role.department_id`;
            connectDB.query(newquery, (err, res) => {
                if (err) throw err;

                console.table(res);
            });
            startMenu();
        });
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the Employee`s first name?',
            validate: (firstName) => {
                if (!firstName) {
                    return 'Please enter a first name.';
                } else if (firstName > 25) {
                    return 'First name must be less than 25 characters.';
                } else {
                    return true;
                }
            }
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the Employee`s last name?',
            validate: (firstName) => {
                if (!firstName) {
                    return 'Please enter a last name.';
                } else if (firstName > 30) {
                    return 'First name must be less than 30 characters.';
                } else {
                    return true;
                }
            }
        },
        {
            name: 'addRole',
            type: 'input',
            message: 'What is the role ID of the new role?',
            validate: (addRole) => {
                if (!addRole) {
                    return 'Please enter a Role ID.';
                } else {
                    return true;
                }
            }
        },
        {
            name: 'addManager',
            type: 'input',
            message: 'What is the Manager ID of the new employee?',
            validate: (addManager) => {
                if (!addManager) {
                    return 'Please enter a Manager ID.';
                } else {
                    return true;
                }
            }
        }

    ])
    .then((answers) => {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        let params = [answers.firstName, answers.lastName, answers.addRole, answers.addManager]
        connectDB.query(query, params, (err, res) => {
            if (err) throw err;

            console.log('Role added successfully.');

            let newquery = `SELECT first_name as 'First Name', 
                            last_name as 'Last Name', 
                            role_id as 'Role ID', 
                            manager_id as 'Manager ID' 
                            FROM employee`;
            connectDB.query(newquery, (err, res) => {
                if (err) throw err;

                console.table(res);
            });
            startMenu();
        });
    })
};

const deleteDepartment = () => {
    let query =`SELECT department.id, department.name FROM department`;

    connectDB.query(query, (err, res) => {
    if (err) throw err;
    let departmentArray = [];
    res.forEach((department) => {departmentArray.push(department.name);});
    
    inquirer.prompt([
        {
            name: 'deleteDepartment',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: departmentArray
        }
        ])
    .then((answer) => {
        let departmentID;
    
        res.forEach((department) => {
            if (answer.deleteDepartment === department.name) {
            departmentID = department.id;
            }
        });
    
    let query = `DELETE FROM department WHERE department.name = ?`;
    connectDB.query(query, departmentID, (err) => {
        if (err) throw err;
        console.log('Department Successfully Removed');
    
        let newquery = `SELECT department.id AS ID, 
                        department.name AS "Department Name" 
                        FROM department`;
    
        connectDB.query(newquery, (err, res) => {
            if (err) throw err;
    
            console.table(res);
            });
        });
    });
    });
};

const deleteRole = () => {    
    let query =`SELECT role.id, role.title FROM role`;

connectDB.query(query, (err, res) => {
if (err) throw err;
let rolesArray = [];
res.forEach((role) => {rolesArray.push(role.title);});

inquirer.prompt([
    {
        name: 'deleteRole',
        type: 'list',
        message: 'Which role would you like to remove?',
        choices: rolesArray
    }
    ])
.then((answer) => {
    let roleID;

    res.forEach((role) => {
        if (answer.deleteRole === role.title) {
        roleID = role.id;
        }
    });

    let query = `DELETE FROM role WHERE role.id = ?`;
    connectDB.query(query, roleID, (err) => {
        if (err) throw err;
        console.log('Role Successfully Removed');

        let newquery = `SELECT role.id AS ID, 
        role.title AS Title,
        role.department_id AS DepartmentID,
        department.name AS Department,
        role.salary AS Salary
        FROM role, department
        WHERE department.id = role.department_id`;

        connectDB.query(newquery, (err, res) => {
            if (err) throw err;

            console.table(res);
        });
        startMenu();
    });
    });
});
};

const deleteEmployee = () => {
    let query =`SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    connectDB.query(query, (err, res) => {
    if (err) throw err;
    let employeeNames = [];
    res.forEach((employee) => {employeeNames.push(`${employee.first_name} ${employee.last_name}`);});

    inquirer.prompt([
        {
            name: 'deleteEmployee',
            type: 'list',
            message: 'Which employee would you like to remove?',
            choices: employeeNames
        }
        ])
    .then((answer) => {
        let employeeID;

        res.forEach((employee) => {
            if (
            answer.deleteEmployee ===
            `${employee.first_name} ${employee.last_name}`
            ) {
            employeeID = employee.id;
            }
        });

        let query = `DELETE FROM employee WHERE employee.id = ?`;
        connectDB.query(query, employeeID, (err) => {
            if (err) throw err;
            console.log('Employee Successfully Removed');

            let newquery = `SELECT first_name as 'First Name', 
                            last_name as 'Last Name', 
                            role_id as 'Role ID', 
                            manager_id as 'Manager ID' 
                            FROM employee`;

            connectDB.query(newquery, (err, res) => {
                if (err) throw err;

                console.table(res);
            });
        startMenu();
        });
        });
    });
};