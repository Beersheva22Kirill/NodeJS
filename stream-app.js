import http from "node:http";
import config from 'config';
import { URL } from "node:url";
import { log } from "node:console";
import RouterDocText from "./src/routes/Router.js";
import { DocTextView } from "./src/view/DocTextView.js";

const SERVER_PORT = 'server.port'

//Comments

const server = http.createServer();
const PORT = process.env.PORT || (config.has(SERVER_PORT) && config.get(SERVER_PORT)) || 0;
server.listen(PORT, () => console.log(`server is listen on port ${server.address().port}`));
const router = new RouterDocText(server);
const docTextView = new DocTextView();
server.on('request',(req,response) => {
    response.setHeader('content-type','text/html');
    const reqUrl = new URL(`http://${req.headers.host}${req.url}`);
    if(!router.getRoutes().includes(reqUrl.pathname)){
        docTextView.renderError(reqUrl.pathname + " unknow operation", response);
        return;
    }    
    
    server.emit(reqUrl.pathname, reqUrl.searchParams, response);
})



