const express = require("express");
const Employees = require("../schemas/Employees");

const createEmployee = async (req, res) => {
    try {
        const employee = new Employees(req.body);
        console.log(employee)
        await employee.save();
        res.status(201).json({ result });
    } catch {
        res.status(500).json({ message: "something went wrong" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employees.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        res.send("Employee deleted");
    } catch (err) {
        console.error(err);
    }
};

const getEmployeeById = async (req, res , next) => {
    const employeeId = req.params.id
    let employee;
    try {
        employee = await Employees.findById(employeeId);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
        return next(err)
    }
    if (!employee) {
        const result = res.status(404).send("Employee not found");
        res.json(result)
    }
    res.json( employee.toObject({getters : true}))
};

const getEmployees = async (req, res) => {
    try {
        const data = await Employees.find();
        res.json( data );
    } catch (err) {
        res.status(500).send(`Error getting employees: ${err.message}`);
    }
};

const searchEmployee = async (req, res) => {
    const employeeName = req.params.search
    try {
        const employees = await Employees.find()
        const employee = employees.filter(item => (
            item.firstname.toLocaleLowerCase().includes(employeeName) || 
            item.lastname.toLocaleLowerCase().includes(employeeName) ||
            item.email.toLocaleLowerCase().includes(employeeName)
        ))
        if (!employee) {
            res.status(404).send("Employee not found");
        }
        console.log(employee)
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        res.send("Employee updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error updating employee: ${err.message}`);
    }
};

exports.createEmployee = createEmployee;
exports.deleteEmployee = deleteEmployee;
exports.getEmployeeById = getEmployeeById;
exports.getEmployees = getEmployees;
exports.searchEmployee = searchEmployee;
exports.updateEmployee = updateEmployee;
