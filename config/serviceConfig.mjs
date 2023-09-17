import UsersService from "../src/service/UsersService.mjs";
import config from 'config'

export const userService = new UsersService(process.env.ATLAS_URI_ACCOUNTS_TEST,config.get('mongodb.dbUsers'));