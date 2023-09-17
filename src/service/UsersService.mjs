import MongoConnection from "../domain/MongoConnection.mjs";
import bcrypt from "bcrypt"

export default class UsersService {

    #collection;

    constructor(connection_string,dataBase){
        const connection = new MongoConnection(connection_string,dataBase)
        this.#collection = connection.getCollection('accounts')
    }

    async addAccount(account){
        const accountDb = await toAccountDb(account);
        await this.#collection.insertOne(accountDb);
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

    toAccount(accountDb){
        const result = {...accountDb,username:accountDb._id};
        delete result._id;
        return result;
    }
}

async function toAccountDb(account) {
   const passHash = await bcrypt.hash(account.password,10); 
    const result = {_id:account.username,
        passwordHash:passHash,
        roles:account.roles};     
    return result;
}