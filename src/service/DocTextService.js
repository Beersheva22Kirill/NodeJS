import fs from 'node:fs/promises';


export default class DocTextService {

    async getDocumentation(handler){
        return await this.#getStream(handler,true)
    }

    
    async getText(handler){
        return await this.#getStream(handler,false);
    }

    async #getStream(handler,isDoc){
            let streamInput = handler.createReadStream();
            streamInput.setEncoding('utf8');
            streamInput = streamInput.flatMap(chank => chank.split('\n')).filter(line => {
                line = line.trim();
                const result = line.startsWith('//');
                return isDoc ? result : !result
            })
            .map(line => isDoc ? line.trim().substr(2) : line);
            
        return streamInput;       
    }
}