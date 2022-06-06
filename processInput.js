class ProcessInput {
  constructor() {
    this.userInfo = {};
    this.keys = ['name', 'dob', 'hobbies'];
    this.index = 0;
  }

  addChunk(chunk) {
    this.userInfo[this.keys[this.index]] = chunk;
    this.index++;
  }

};

exports.ProcessInput = ProcessInput;
