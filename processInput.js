class Form {
  constructor() {
    this.userInfo = {};
    this.keys = ['name', 'dob', 'hobbies'];
    this.messages = ['Please enter your name', 'Enter your dob (yyyy-mm-dd)', 'Enter your hobbies'];
    this.index = 0;
  }

  #validateName(chunk) {
    return chunk.length < 6 && /^[a-z]+$/.test(chunk);
  }

  #validateDob(chunk) {
    return /^\d{4}-\d{2}-\d{2}$/.test(chunk);
  }

  #validateHobbies(chunk) {
    return chunk.length > 0;
  }

  insertInfo(chunk) {
    const key = this.keys[this.index];
    if (key === 'name' && this.#validateName(chunk)) {
      this.userInfo.name = chunk;
      this.index++;
    }

    if (key === 'dob' && this.#validateDob(chunk)) {
      this.userInfo.dob = chunk;
      this.index++;
    }

    if (key === 'hobbies' && this.#validateHobbies(chunk)) {
      this.userInfo[key] = [(chunk)];
      this.index++;
    }
  }

  message() {
    console.log(this.messages[this.index]);
  }

  toString() {
    return this.userInfo;
  }

  allInputReceived() {
    return this.index === 3;
  }

};

exports.Form = Form;
