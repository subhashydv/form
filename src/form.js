class Form {
  constructor(...fields) {
    this.fields = fields;
    this.index = 0;
  }

  fillForm(response) {
    const field = this.fields[this.index];
    if (field.isValid(response)) {
      field.fillResponse(response);
      this.index++;
    }
  }

  message() {
    return this.fields[this.index].getPrompt();
  }

  toString() {
    const output = {};
    this.fields.forEach(field => {
      const { title } = field;
      output[title] = field.getResponse();
    });
    return output;
  }

  allInputReceived() {
    return this.index === this.fields.length;
  }
};

const registerResponse = (response, form, writeInFile, logger) => {
  form.fillForm(response);

  if (!form.allInputReceived()) {
    logger(form.message());
    return;
  }

  logger('Thank You!');
  writeInFile(form.toString());
}

module.exports = { registerResponse, Form };
