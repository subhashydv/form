class Form {
  #index;

  constructor(...fields) {
    this.fields = fields;
    this.#index = 0;
  }

  fillForm(response) {
    if (this.#isResponseValid(response)) {
      this.#currentField().fillResponse(response);
      if (this.#currentField().isFilled()) {
        this.#index++;
      }
    }
  }

  #currentField() {
    return this.fields[this.#index];
  }

  #isResponseValid(response) {
    const field = this.#currentField();
    if (!field.isValid(response)) {
      throw new Error();
    }
    return true;
  }

  prompt() {
    return this.#currentField().getPrompt();
  }

  getResponses() {
    return this.fields.reduce((output, field) => {
      output[field.title] = field.getResponse();
      return output;
    }, {});
  }

  allResponseReceived() {
    return this.#index === this.fields.length;
  }
};

const registerResponse = (response, form, writeInFile, logger) => {
  try {
    form.fillForm(response);
  } catch (err) {
    logger('Invalid Input')
  }

  if (!form.allResponseReceived()) {
    logger(form.prompt());
    return;
  }

  logger('Thank You!');
  writeInFile(form.getResponses());
}

module.exports = { registerResponse, Form };
