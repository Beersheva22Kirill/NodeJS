import bodyParser from 'body-parser';
import express from 'express';
import config from 'config';
import { users } from './src/router/Users.mjs';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './src/middleware/errorHandler.mjs';
import { randomUsers } from './src/router/RandomUsers.mjs';
import { employees } from './src/router/Employees.mjs';
import auth from './src/middleware/auth.mjs';



const app = express();
app.use(cors());
const SERVER_PORT = 'server.port';
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(auth);

app.use('/users',users);
app.use('/randomusers',randomUsers);
app.use('/employees',employees)

const port = process.env.PORT || config.get(SERVER_PORT)
const server = app.listen(port);

app.use(errorHandler);
server.on('listening',() => console.log(`server listening on port ${server.address().port}`))