import { ur } from "@faker-js/faker";
import express from 'express'
import FakeUsers from "../service/FakeUsers.mjs";
import UsersService from "../service/UsersService.mjs";
import config from 'config';
import { userService } from "../../config/serviceConfig.mjs";

export const randomUsers = express.Router();

randomUsers.post('/generate',async (req,res) => {
    
    const url = new URL(`http:\\${req.headers.host}${req.url}`);
    const params = url.searchParams;
    const count = Number.parseInt(params.get('count'))
    const fakeUsers = new FakeUsers(count);
    const service = new UsersService(process.env.ATLAS_URI_ACCOUNTS_TEST,config.get('mongodb.dbUsers'));
    const countFakeUsers = await service.addArrAccounts(fakeUsers.users);

    res.status(201).send({countfakeusers:countFakeUsers});


})
