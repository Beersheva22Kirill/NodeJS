import http from 'node:http';
import config from 'config';
import { URL } from 'node:url';
import CalculatorService, { UNKNOW_OPERATION } from './src/service/CalculatorService.js';
import { operations } from './config/operations.js';

const PORT = process.env.PORT || config.has('server.port') && config.get('server.port') || 0;

const server = http.createServer();
const calculatorService = new CalculatorService(server, operations);
server.listen(PORT, () => console.log(`server is listening on the port ${server.address().port}`))
server.on('request', (req, res) => {
   res.setHeader('content-type', 'text/html')
    const reqUrl = new URL(`http://${req.headers.host}${req.url}`);
   
   const operands = reqUrl.searchParams;
   const op1 = +operands.get('op1');
   const op2 = +operands.get('op2');
   
   let operation = UNKNOW_OPERATION;
   if ( operations.has(reqUrl.pathname)) {
      operation = reqUrl.pathname;
   } 
   
   server.emit(operation, [op1, op2], res);
    
    
})