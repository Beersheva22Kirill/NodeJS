import readline from 'node:readline';


const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


export class PromptAsync {
    #readLineInterface
   
    prompt(promptStr) {
       
        return new Promise(resolve => {
            readlineInterface.question(promptStr + '--->', answer => {
               resolve(answer)
            })
        })
    }
    close() {
        readlineInterface.close();
    }
    async readObject(promptStr, mapper) {
        let running;
        let res;
            do {
                running = false;
                try {
                    const answer = await this.prompt(promptStr);
                    res = mapper(answer);
                } catch (error) {
                    console.log(error);
                    running=true;
                }
            } while(running);
            return res;

    }
    #mapperNumber(answer, min, max) {
        const num = +answer;
        if (isNaN(num)) {
            throw `${answer} is not a number`
        }
        if (num < min) {
            throw `${num} must not be less than ${min}`
        }
        if (num > max) {
            throw `${num} must not be greater than ${max}`
        }
        return num;
    }
    readNumber(promptStr, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
       return this.readObject(promptStr, answer => this.#mapperNumber(answer, min, max));
    }
    readPredicate(promptStr, errorPrompt, predicate) {
        return this.readObject(promptStr, answer => {
            if (!predicate(answer)) {
                throw errorPrompt;
            }
            return answer;
        })
    }
}
