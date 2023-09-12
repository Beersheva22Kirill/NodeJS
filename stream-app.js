import fs from 'node:fs/promises';
import http from "node:http";
import { Stream } from 'node:stream';

//stream theory:
//
// writeble stream (write) analog outputstream
// readable stream (read) analog inputstream
// duplex (write and read) analog socket
// transform stream 

//Example:
//<readable strem>.pipe(<writeble stream>)
//<socket stream>.map<request => protocol.getResponse(request)>.pipe(<socket strem>)
//pipeline(<readble stream>, <transform stream>, <writeble stream>)


const isCommets = process.argv[2] == 'comments'
const fileInputName = process.argv[3] || 'stream-app.js';
const fileOutput = process.argv[4] || "stream-app-out"
 

const handlerInput = await fs.open(fileInputName);
const handlerOutput = await fs.open(fileOutput, 'w');
const streamOutput = handlerOutput.createWriteStream();

//handlerInput.readFile('utf8').then(data => console.log(data));

function getStreamWith(handler,isComments) {
    let streamInput = handler.createReadStream();
    streamInput.setEncoding('utf8');
    streamInput = streamInput.flatMap(chank => chank.split('\n')).filter(line => {
        line = line.trim();
        const result = line.startsWith('//');
        return isComments ? result : !result
        line.trim().startsWith('//')
    })
    .map(line => isComments ? line.substr('//') : line);
return streamInput;
}

// getStreamWith(handlerInput,isCommets).forEach(line => {
//     console.log(line);
// });


getStreamWith(handlerInput,isCommets).pipe(streamOutput);

