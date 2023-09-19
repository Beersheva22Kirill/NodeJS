import express from 'express';
import asyncHandler from 'express-async-handler'
import EmployeesService from '../service/EmployeesService.mjs';
import authVerification from '../middleware/authVerification.mjs';
import { validate } from '../middleware/validation.mjs';
import { schemaEmployee } from '../validation/EmployeeShemas.mjs';
import valid from '../middleware/valid.mjs';

export const employees = express.Router();

const employeesService = new EmployeesService();

employees.use(validate(schemaEmployee))

employees.post('', authVerification('ADMIN'), valid, asyncHandler(
    async (req,res) => {
        if(req.joiError) {
            res.status(400);
            throw req.joiError;
        }
        const employee = await employeesService.addEmployee(req.body);
        if (!employee && req.body.id) {
            res.status(400);
            throw `employee with id ${req.body.id} already exists`
        }
        res.send(employee);
    }
))

employees.put('/:id',authVerification("ADMIN"), valid, asyncHandler(
    async (req, res) => {
        if(req.joiError) {
            res.status(400);
            throw req.joiError;
        }
        if (req.params.id != req.body.id) {
            res.status(400);
            throw `id in request parameter (${req.params.id}) doesn't match the id in employee object (req.body.id)`
        }
        const employee = await employeesService.updateEmployee(req.body);
        if (!employee) {
            res.status(404);
            throw `employee with id ${req.body.id} doesn't exist`
        }
        res.send(employee);
    }
))

employees.delete('/:id',authVerification("ADMIN"), asyncHandler(
    async (req,res) => {
        if(!await employeesService.deleteEmployee(+req.params.id)) {
            res.status(404);
            throw `employee with id ${req.params.id} doesn't exist`
        }
        res.send();
    }
))

 employees.get('', authVerification("ADMIN", "USER"),asyncHandler(
    async(req,res) => {
        const employees = await employeesService.getAllEmployees();
        res.send(employees);
    }
))

employees.get('/:id',authVerification("ADMIN", "USER"), asyncHandler(
   async (req, res) => {
    
    const employee = await employeesService.getEmployee(+req.params.id);
    if (!employee) {
        res.status(404);
        throw `employee with id ${req.params.id} doesn't exist`
    }
    res.send(employee)
   } 
))