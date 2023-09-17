import express from 'express'
import Joi from 'joi';
import { schemaUser, schemaUserYuri } from '../validation/UserValidator.mjs';
import { validate } from '../middleware/validation.mjs';
import UsersService from '../service/UsersService.mjs';
import config from 'config';

export const users = express.Router();
const service = new UsersService(process.env.ATLAS_URI_ACCOUNTS_TEST,config.get('mongodb.dbUsers'));

users.use(validate(schemaUserYuri))
users.post('/signup',async (req,res) => {
    
    //My validation with assert and schema of user (Joi)
    // Joi.assert(req.body,schemaUser); 
    // req.body.validate = true;
    
    if (!req.validated) {
        res.status(500)
        throw('This API requires validation')
    }  

    if (req.joiError){
        res.status(400)
        throw(`Error validation: ${req.joiError}`)
       
    } 
        
    res.status(201).send(await service.addAccount(req.body));
    
    
})
