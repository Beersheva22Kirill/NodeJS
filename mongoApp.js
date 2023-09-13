import MongoConnection from "./src/domain/MongoConnection.js";
import config  from 'config';

const database = new MongoConnection(process.env.ATLAS_URI,"college");

const studentCollection = database.getCollection("Students");
studentCollection.find({phone:{$regex:/^050/}}).toArray().then((data) => console.log(data))

