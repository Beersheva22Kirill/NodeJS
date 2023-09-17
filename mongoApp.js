import MongoConnection from "./src/domain/MongoConnection.mjs";
import config  from 'config';
import { log } from "node:console";
import http from "node:http";

const SERVER_PORT = 'server.port';
const PORT = process.env.PORT || (config.has(SERVER_PORT) && config.get(SERVER_PORT)) || 0;
const database = new MongoConnection(process.env.ATLAS_URI,"college");
const studentCollection = database.getCollection("Students");

let array = [];
studentCollection.find({phone:{$regex:/^050/}}).toArray().then((data) => {
    console.log(data);
    data.forEach(el => array.push(el));
    console.log('array');
    console.log(array);
});
// console.log('array');
// console.log(array);

//studentCollection.find({phone:{$regex:/^050/}}).toArray().then((data) => console.log(data))


