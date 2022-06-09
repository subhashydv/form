const fs = require('fs');
const { registerResponse, Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const { MultiField } = require('./src/multiField.js');
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
  const addField = new MultiField('address', ['Enter address line 1', 'Enter address line 2'], (x) => x);

  return new Form(nameField, dobField, hobbiesField, phNoField, addField);
};

const fillForm = () => {
  const form = createForm();

  console.log(form.prompt());
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const response = chunk.trim().split('\n');
    response.forEach(element => {
      registerResponse(element, form, writeInJson, console.log);
    });
  });
}

fillForm();
