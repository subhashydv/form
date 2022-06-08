const { registerResponse, formConfig } = require('./src/formMain.js');
const { Form } = require('./src/form.js');

const fillForm = () => {
  const form = new Form();
  form.addConfig(formConfig);

  console.log(form.message());
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    registerResponse(chunk.trim(), form);
  });
}

fillForm();
