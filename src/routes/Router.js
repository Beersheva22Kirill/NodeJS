
import DocTextService from "../service/DocTextService.js";
import fs from 'node:fs/promises'
import { DocTextView } from "../view/DocTextView.js";

const docTextView = new DocTextView();

function pipeResponse(streamReadble, response){
    streamReadble.map(line => docTextView.renderLine(line)).pipe(response);
}

export default class RouterDocText {

    #docTextService;

    constructor (emmiter) {
        this.#docTextService = new DocTextService();
        emmiter.addListener('/doc',(searchParams,response) => this.documentation(searchParams,response));
        emmiter.addListener('/text',(searchParams,response) => this.text(searchParams,response));
    }

    async documentation(searchParams,response) {
        console.log(`documentation route, file`);
        const file = this.getFile(searchParams,response);  
        try {
            const handler = await fs.open(file);
            const stream = await this.#docTextService.getDocumentation(handler);
            pipeResponse(stream,response);
        } catch (error) {
            docTextView.renderError(`file:${searchParams} cannot be opened`,response);
        }
        
    }

    async text(searchParams,response){
        console.log(`logging text route, file: ${searchParams}`);
        const file = this.getFile(searchParams,response);

        try {
            const handler = await fs.open(file);
            const stream = await this.#docTextService.getText(handler);
            pipeResponse(stream,response)  
        } catch (error) {
            docTextView.renderError(`file:${searchParams} cannot be opened`,response);
        } 
    }

    getRoutes(){
        return ["/doc","/text"];
    }

    getFile(searchParams,response){
       const file = searchParams.get('file');
        if(!file){
            docTextView.renderError(`parametr 'file' not found`,response)
            return
        }
        return file;
    }
}