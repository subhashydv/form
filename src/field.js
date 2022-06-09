class Field {
  #prompt;
  #validator;
  #parser;

  constructor(name, prompt, validator, parser = (x) => x) {
    this.title = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.response = null;
  }

  fillResponse(response) {
    this.response = response;
  }

  getEntries() {
    return this.#parser(this.response);
  }

  getPrompt() {
    return this.#prompt;
  }

  isFilled() {
    return this.response !== null;
  }

  isValid(response) {
    return this.#validator(response);
  }
}

module.exports = { Field };
