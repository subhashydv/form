class MultiField {
  #prompts;
  #validator;
  #parser;
  #index;
  #responses

  constructor(name, prompts, validator, parser = (x) => x) {
    this.title = name;
    this.#prompts = prompts;
    this.#validator = validator;
    this.#parser = parser;
    this.#responses = [];
    this.#index = 0;
  }

  fillResponse(response) {
    this.#responses.push(response);
    this.#index++;
  }

  getEntries() {
    return this.#parser(this.#responses);
  }

  getPrompt() {
    return this.#prompts[this.#index];
  }

  isFilled() {
    return this.#index === this.#prompts.length;
  }

  isValid(response) {
    return this.#validator(response);
  }
}

module.exports = { MultiField };
