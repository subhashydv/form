const fs = require('fs');
const { registerResponse, Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const {
  validateDob, validateName, validateHobbies, validatePhNo
} = require('./src/validator.js');

const parseHobbies = hobbies => hobbies.split(',');

const writeInJson = data => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  process.stdin.destroy();
};

const createForm = () => {
  const nameField = new Field('name', 'Enter name', validateName);
  const dobField = new Field('dob', 'Enter dob', validateDob);
  const hobbiesField = new Field('hobbies', 'Enter hobbies', validateHobbies, parseHobbies);
  const phNoField = new Field('ph-no', 'Enter phone number', validatePhNo);

  return new Form(nameField, dobField, hobbiesField, phNoField);
};

const fillForm = () => {
  const form = createForm();

  console.log(form.prompt());
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (response) => {
    registerResponse(response.trim(), form, writeInJson, console.log);
  });
}

fillForm();
