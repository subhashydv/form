class Form {
  constructor() {
    this.userInfo = {};
    this.keys = ['name', 'dob', 'hobbies', 'ph-no'];
    this.messages = ['Please enter your name', 'Enter your dob (yyyy-mm-dd)', 'Enter your hobbies', 'Enter your phone number'];
    this.index = 0;
  }

  #validateName(name) {
    return name.length < 6 && /^[a-z]+$/.test(name);
  }

  #validateDob(dob) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dob);
  }

  #validateHobbies(hobbies) {
    return hobbies.length > 0;
  }

  #validatePhNo(phNo) {
    return /^\d{10}$/.test(phNo);
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

    if (key === 'ph-no' && this.#validatePhNo(chunk)) {
      this.userInfo[key] = chunk;
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
    return this.index === this.keys.length;
  }

};

exports.Form = Form;
