import bodyParser from 'body-parser';
import express from 'express';
import { users } from './src/router/Users.mjs';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.mjs';
import { randomUsers } from './src/router/RandomUsers.mjs';
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/users',users);
app.use('/randomusers',randomUsers);
const server = app.listen(8080);

app.use(errorHandler);
server.on('listening',() => console.log(`server listening on port ${server.address().port}`))