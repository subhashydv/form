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

  it('Should log Invalid Input with same prompt if input is invalid', () => {
    const lengthMoreThan4 = x => x.length > 4;
    const nameField = new Field('name', 'Enter name', lengthMoreThan4);
    const form = new Form(nameField);

    const content = [];
    const logger = data => content.push(data);
    registerResponse('prem', form, identity, logger);

    assert.deepStrictEqual(content, ['Invalid Input', 'Enter name']);
  });
});

describe('Form', () => {
  it('Should return prompt', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const form = new Form(nameField);

    assert.strictEqual(form.prompt(), 'Enter name');
  });

  it('Should fill the response', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const form = new Form(nameField);

    form.fillForm('prem');
    assert.deepStrictEqual(form.getResponses(), { name: 'prem' });
  });

  it('Should validate if all responses received', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const form = new Form(nameField);

    form.fillForm('prem');
    assert.ok(form.allResponseReceived());
  });

  it('Should throw error if response is invalid', () => {
    const lengthMoreThan4 = x => x.length > 4;
    const nameField = new Field('name', 'Enter name', lengthMoreThan4);
    const form = new Form(nameField);

    assert.throws(() => form.fillForm('prem'));
  });
});
