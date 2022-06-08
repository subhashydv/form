const fs = require('fs');

const validateName = name => name.length > 4 && /^[a-z ]+$/.test(name);

const validateDob = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);

const validateHobbies = hobbies => hobbies.length > 0;

const validatePhNo = phNo => /^\d{10}$/.test(phNo);

const validateAddress = () => true;

const identity = info => info;

const parseHobbies = hobbies => hobbies.split(',');

const formConfig = [{
  title: 'name',
  validator: validateName,
  message: 'Please enter your name',
  parser: identity
},
{
  title: 'dob',
  validator: validateDob,
  message: 'Please enter your Dob(yyyy-mm-dd)',
  parser: identity
},
{
  title: 'hobbies',
  validator: validateHobbies,
  message: 'Please enter your hobbies',
  parser: parseHobbies
},
{
  title: 'ph-no',
  validator: validatePhNo,
  message: 'Please enter your phone number',
  parser: identity
},
{
  title: 'address',
  validator: validateAddress,
  message: 'Please enter your address line 1',
  parser: identity
},
{
  title: 'address',
  validator: validateAddress,
  message: 'Please enter your address line 2',
  parser: identity
}
];


const writeInJson = data => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8')
}

const registerResponse = (info, form) => {
  form.insertInfo(info);

  if (form.allInputReceived()) {
    console.log('Thank You!');
    writeInJson(form.toString());
    process.exit(0);
  }
  console.log(form.message());
}

module.exports = { registerResponse, formConfig };
