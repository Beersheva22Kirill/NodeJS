import promptSync from 'prompt-sync';

const prompt = promptSync({sigint:true});
const guessNumber = 5;

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
