const fs = require('fs');
const { registerResponse, Form } = require('./src/form.js');
const { Field } = require('./src/field.js');

const validateName = name => name.length > 4 && /^[a-z ]+$/.test(name);

const validateDob = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);

const validateHobbies = hobbies => hobbies.length > 0;

const validatePhNo = phNo => /^\d{10}$/.test(phNo);

const parseHobbies = hobbies => hobbies.split(',');

const writeInJson = data => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  process.stdin.destroy();
};

const fillForm = () => {
  const nameField = new Field('name', 'Enter name', validateName);
  const dobField = new Field('dob', 'Enter dob', validateDob);
  const hobbiesField = new Field('hobbies', 'Enter hobbies', validateHobbies, parseHobbies);
  const phNoField = new Field('ph-no', 'Enter phone number', validatePhNo);

  const form = new Form(nameField, dobField, hobbiesField, phNoField);

  console.log(form.message());
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (response) => {
    registerResponse(response.trim(), form, writeInJson, console.log);
  });
}

fillForm();
