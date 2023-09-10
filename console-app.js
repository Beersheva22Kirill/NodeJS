import promptSync from 'prompt-sync';
import config from 'config'

const prompt = promptSync({sigint:true});
const guessNumber = 1 + Math.trunc(Math.random() * 10);
if (config.has('test') && config.get('test')){
    console.log(guessNumber)
}
let running = true;

do {
    let num = prompt("guess number from 1 to 10 -->");
    if (num == guessNumber){
        console.log("You win");
        running = false;
    } else {
        console.log("No, try again");
    }
} while (running);
