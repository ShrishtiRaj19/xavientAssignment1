var employee = require('../controllers/employee');

module.exports = (router) => {
    router.post('/employee/create', employee.createEmployee);
    router.get('/employee/get', employee.getEmployee);
    router.post('/employee/search', employee.searchEmployee);
    router.get('/employee/:id', employee.getEmployeeById);
    router.put('/employee/update/:id', employee.updateEmployee);
    router.delete('/employee/delete/:id', employee.deleteEmployee);
}