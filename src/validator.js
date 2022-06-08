const validateName = name => name.length > 4 && /^[a-z ]+$/.test(name);

const validateDob = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);

const validateHobbies = hobbies => hobbies.length > 0;

const validatePhNo = phNo => /^\d{10}$/.test(phNo);

module.exports = { validateDob, validateName, validateHobbies, validatePhNo };
