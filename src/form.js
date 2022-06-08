class Form {
  constructor() {
    this.userInfo = {};
    this.index = 0;
  }

  addConfig(details) {
    this.formConfig = details;
  }

  insertInfo(info) {
    const { title, validator, parser } = this.formConfig[this.index];

    if (validator(info)) {
      this.userInfo[title] = this.userInfo[title] ? this.userInfo[title] + '\n' + parser(info) : parser(info);
      this.index++;
    }
  }

  message() {
    return this.formConfig[this.index].message;
  }

  toString() {
    return this.userInfo;
  }

  allInputReceived() {
    return this.index === this.formConfig.length;
  }
};

const registerResponse = (info, form, writeInFile) => {
  form.insertInfo(info);

  if (form.allInputReceived()) {
    console.log('Thank You!');
    writeInFile(form.toString());
    process.exit(0);
  }
  console.log(form.message());
}

module.exports = { registerResponse, Form };
