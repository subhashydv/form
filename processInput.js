class Form {
  constructor() {
    this.userInfo = {};
    this.keys = ['name', 'dob', 'hobbies'];
    this.messages = ['Please enter your name', 'Enter your dob (yyyy-mm-dd)', 'Enter your hobbies'];
    this.index = 0;
  }

  addChunk(chunk) {
    const key = this.keys[this.index];
    if (key === 'hobbies') {
      this.userInfo[key] = [(chunk)];
    } else {
      this.userInfo[key] = chunk;
    }
    this.index++;
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
