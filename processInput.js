class Form {
  constructor() {
    this.userInfo = {};
    this.index = 0;
  }

  addDetails(details) {
    this.details = details;
  }

  insertInfo(chunk) {
    const details = this.details[this.index];
    const key = details.title;

    if (details.validator(chunk)) {
      this.userInfo[key] = details.parser(chunk);
      this.index++;
    }
  }

  message() {
    console.log(this.details[this.index].message);
  }

  toString() {
    return this.userInfo;
  }

  allInputReceived() {
    return this.index === this.details.length;
  }
};

exports.Form = Form;
