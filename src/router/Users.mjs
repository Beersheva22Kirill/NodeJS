import express from 'express'
import { schemaUser } from '../validation/UserValidator.mjs';
import { validate } from '../middleware/validation.mjs';
import UsersService from '../service/UsersService.mjs';
import asyncHandler from 'express-async-handler'
import { userService } from '../../config/serviceConfig.mjs';
import authVerification from '../middleware/authVerification.mjs';
import valid from '../middleware/valid.mjs';

export const users = express.Router();
const service = new UsersService();

users.use(validate(schemaUser))
users.post('/signup', valid, authVerification('ADMIN_ACCOUNTS'), asyncHandler(
    async (req,res) => {
        
    res.status(201).send(await service.addAccount(req.body));
})   
)

users.get("/:username", authVerification('ADMIN_ACCOUNTS',"ADMIN","USER"), asyncHandler(
    async (req,res) => {
        const username = req.params.username;

        const account = await userService.getAccount(username);
        if(!account) {
            res.status(404);
            throw `account ${username} not found`
        }
        res.send(account);
    }
))

users.post("/login", asyncHandler(
    async (req,res) => {
        const loginData = req.body;
        const accessToken = await userService.login(loginData);
        if(!accessToken){
            res.status(400);
            throw `Wrong credentials`
        }
        res.send({accessToken});

}))
