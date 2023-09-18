import MongoConnection from "../domain/MongoConnection.mjs";
import bcrypt from "bcrypt"
import config from 'config';
import Jwt  from "jsonwebtoken";
import { ENV_JWT_SECRET, MONGO_DB_COMPANY_NAME, MONGO_ENV_URI_COMPANY } from "../constant/constants.mjs";


export default class UsersService {

    #collection;

    constructor(){
        const connection_string = process.env[config.get(MONGO_ENV_URI_COMPANY)];
        const dataBase = config.get(MONGO_DB_COMPANY_NAME)
        const connection = new MongoConnection(connection_string,dataBase)
        this.#collection = connection.getCollection('accounts')
    }

    async addAccount(account){
        const accountDb = await toAccountDb(account);
        try {
            await this.#collection.insertOne(accountDb);
        } catch (error) {
            if (error.code == 11000) {
                account = null;
            } else {
                throw error;
            }
        }
        
        return account;
    }

    async addArrAccounts(arrAccounts){
            let arrAccountsDb = []; 
            arrAccounts.map(async(account) => {
                arrAccountsDb.push( await toAccountDb(account))
            })
            await this.#collection.insertMany(arrAccountsDb);
        return arrAccountsDb.length;
    }

    async getAccount(username){
        const document = await this.#collection.findOne({_id:username});
        return document == null ? null : toAccount(document);
    }

    async login(loginData){
        const account = await this.getAccount(loginData.username);
        let accessToken;
        if (account && await bcrypt.compare(loginData.password, account.passwordHash)) {
            accessToken = getJWTToken(account.username,account.roles);
        }
        return accessToken;
    }
}


function toAccount(accountDb){
    const result = {username:accountDb._id,roles:accountDb.roles,passwordHash:accountDb.passwordHash};
    delete result._id;
    return result;
}

async function toAccountDb(account) {
   const passHash = await bcrypt.hash(account.password,10); 
    const result = {_id:account.username,
        passwordHash:passHash,
        roles:account.roles};     
    return result;
}

function getJWTToken(username, roles) {
    return Jwt.sign({roles},process.env[config.get(ENV_JWT_SECRET)],{
        expiresIn:config.get("jwt.expiresIn"),
        subject:username
    })
}