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

const registerResponse = (info, form, writeInFile) => {
  form.fillForm(info);

  if (form.allInputReceived()) {
    console.log('Thank You!');
    writeInFile(form.toString());
    process.exit(0);
  }
  console.log(form.message());
}

module.exports = { registerResponse, Form };
