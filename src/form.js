class Form {
  #index;

  constructor(...fields) {
    this.fields = fields;
    this.#index = 0;
  }

  fillForm(response) {
    if (this.#isResponseValid(response)) {
      this.#currentField().fillResponse(response);
      this.#index++;
    }
  }

  #currentField() {
    return this.fields[this.#index];
  }

  #isResponseValid(response) {
    const field = this.#currentField();
    return field.isValid(response);
  }

  prompt() {
    return this.#currentField().getPrompt();
  }

  toString() {
    const output = {};
    this.fields.forEach(field => {
      const { title } = field;
      output[title] = field.getResponse();
    });
    return output;
  }

  allResponseReceived() {
    return this.#index === this.fields.length;
  }
};

const registerResponse = (response, form, writeInFile, logger) => {
  form.fillForm(response);

  if (!form.allResponseReceived()) {
    logger(form.prompt());
    return;
  }

  logger('Thank You!');
  writeInFile(form.toString());
}

module.exports = { registerResponse, Form };
