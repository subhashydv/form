const fs = require('fs');
const { ProcessInput } = require('./processInput.js');


const readInput = (callBack, writeInFile) => {
  const messages = ['Please enter your name', 'Enter your dob (yyyy-mm-dd)', 'Enter your hobbies', 'thank you'];
  let index = 0;

  process.stdin.setEncoding('utf8');
  console.log(messages[index]);

  process.stdin.on('data', (chunk) => {
    callBack(chunk.slice(0, -1));
    index++;
    console.log(messages[index]);
    if (index > 2) {
      writeInJson(writeInFile);
      process.exit(0);
    }
  })

};

const writeInJson = data => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8')
}

const form = () => {
  const processInput = new ProcessInput();

  readInput((chunk) => processInput.addChunk(chunk), processInput.toString());
}


form();
