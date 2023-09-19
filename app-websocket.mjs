import {WebSocketServer} from "ws";
import PromptAsync from "./PromptAsync.mjs";
import PromptSync from "prompt-sync";

const wss = new WebSocketServer({port:8080});
const promptAsync = new PromptAsync();

wss.on('listening', () => {
    console.log('Server is listening on port 8080');
});

wss.on('connection',(ws,req) => {
    console.log(`Connection from ${req.socket.remoteAddress} established`);
    console.log(`Body inside request ${req.body}`);
    ws.send('Hello');
    ws.on('close', () => {
        console.log(`Connection from ${req.socket.remoteAddress} closed`);
    })
    ws.on('message', async (message) => {
        const answer = await promptAsync.prompt(message.toString());
        ws.send(answer);
    })
})
