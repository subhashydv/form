class Field {
  constructor(name, prompt, validator, parser = () => true) {
    this.title = name;
    this.prompt = prompt;
    this.validator = validator;
    this.parser = parser;
  }

  fillResponse(response) {
    this.response = response;
  }

  getResponse() {
    return this.parser(this.response);
  }

  getPrompt() {
    return this.prompt;
  }

  isValid(response) {
    return this.validator(response);
  }
}

module.exports = { Field };