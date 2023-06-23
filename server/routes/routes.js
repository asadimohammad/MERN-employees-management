const express = require('express')
const employeeRouter = express.Router()
const employeeControler = require('../controller/employee-controller');

employeeRouter.post('/', employeeControler.createEmployee)
employeeRouter.delete('/:id', employeeControler.deleteEmployee)
employeeRouter.get('/:id', employeeControler.getEmployeeById)
employeeRouter.get('/', employeeControler.getEmployees)
employeeRouter.get('/searchemployee/:search', employeeControler.searchEmployee)
employeeRouter.put('/:id', employeeControler.updateEmployee)

module.exports = employeeRouter;