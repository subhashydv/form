const assert = require('assert');
const { MultiField } = require('../src/multiField');

const identity = (x) => x;

describe('multiField', () => {
  it('Should return multiple prompts', () => {
    const multiField = new MultiField('name', ['Enter address 1', 'Enter address 2'], identity);

    assert.strictEqual(multiField.getPrompt(), 'Enter address 1');
    multiField.fillResponse('prem');
    assert.strictEqual(multiField.getPrompt(), 'Enter address 2');
  });

  it('Should fill the responses', () => {
    const multiField = new MultiField('name', ['Enter address 1', 'Enter address 2'], identity, (x) => x.join('\n'));

    multiField.fillResponse('prem');
    multiField.fillResponse('tanmay');
    assert.strictEqual(multiField.getResponse(), 'prem\ntanmay');
  });

  it('Should assert if all responses received', () => {
    const multiField = new MultiField('name', ['Enter address 1', 'Enter address 2'], identity);

    multiField.fillResponse('prem');
    assert.ok(!multiField.isFilled());
    multiField.fillResponse('tanmay');
    assert.ok(multiField.isFilled());
  });
});