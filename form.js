const fs = require('fs');
const { Form } = require('./processInput.js');


const readInput = (callBack) => {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    callBack(chunk.slice(0, -1));
  });
};

const writeInJson = data => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8')
}

const form = () => {
  const form = new Form();

  form.message();
  readInput((chunk) => {
    form.addChunk(chunk);
    form.message();
    if (form.allInputReceived()) {
      writeInJson(form.toString());
      process.exit(0);
    }
  });
}


form();
