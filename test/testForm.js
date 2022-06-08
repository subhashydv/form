const assert = require('assert');
const { registerResponse, Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const identity = (x) => x;


describe('registerResponse', () => {
  it('Should print next prompt after receiving response', () => {
    const nameField = new Field('name', 'Enter Name', identity);
    const dobField = new Field('dob', 'Enter dob', identity);
    const form = new Form(nameField, dobField);

    let responses = [];
    const logger = response => responses.push(response);
    registerResponse('prem', form, identity, logger);

    assert.deepStrictEqual(responses, ['Enter dob']);
  });

  it('Should write the content in file', () => {
    const nameField = new Field('name', '', identity);
    const form = new Form(nameField);

    const content = [];
    const mockWrite = (data) => content.push(data);
    registerResponse('prem', form, mockWrite, identity);

    assert.deepStrictEqual(content, [{ name: 'prem' }]);
  });
});