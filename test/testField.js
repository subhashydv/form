const assert = require('assert');
const { Field } = require("../src/field");

describe('Field', () => {
  it('Should fill the response', () => {
    const field = new Field('name', '', (x) => x);
    field.fillResponse('prem');
    assert.strictEqual(field.getEntries(), 'prem');
  });

  it('Should return the prompt', () => {
    const field = new Field('name', 'Enter name', (x) => x);
    field.fillResponse('prem');
    assert.strictEqual(field.getPrompt(), 'Enter name');
  });

  it('Should validate the response', () => {
    const lengthMoreThan4 = x => x.length > 4;
    const field = new Field('name', 'Enter name', lengthMoreThan4);
    assert.ok(field.isValid('nitin'));
    assert.ok(!field.isValid('prem'));
  });
});