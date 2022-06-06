const { ProcessInput } = require('./processInput.js');


const readInput = (callBack) => {
  const questions = ['Please enter your name', 'Enter your dob (yyyy-mm-dd)', 'Enter your hobbies'];
  let index = 0;

  process.stdin.setEncoding('utf8');
  console.log(questions[index]);
  process.stdin.on('data', (chunk) => {
    callBack(chunk);
    console.log(questions[++index]);
  })
};

const form = () => {
  const processInput = new ProcessInput();

  readInput((chunk) => processInput.addChunk(chunk));
}


form();
