class Form {
  constructor() {
    this.userInfo = {};
    this.index = 0;
  }

  addDetails(details) {
    this.details = details;
  }

  insertInfo(info) {
    const details = this.details[this.index];
    const key = details.title;

    if (details.validator(info)) {
      this.userInfo[key] = details.parser(info);
      this.index++;
    }
  }

  message() {
    return this.details[this.index].message;
  }

  toString() {
    return this.userInfo;
  }

  allInputReceived() {
    return this.index === this.details.length;
  }
};

exports.Form = Form;
