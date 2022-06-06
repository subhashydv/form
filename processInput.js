class ProcessInput {
  constructor() {
    this.userInfo = {};
    this.keys = ['name', 'dob', 'hobbies'];
    this.index = 0;
  }

  addChunk(chunk) {
    const key = this.keys[this.index];
    if (key === 'hobbies') {
      this.userInfo[key] = [(chunk)]
    } else {
      this.userInfo[key] = chunk;
    }
    this.index++;
  }

  toString() {
    return this.userInfo;
  }

};

exports.ProcessInput = ProcessInput;
