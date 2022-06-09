#! /bin/bash
PROMPTS=$( echo `node fillForm.js << EOF
subhash
2000-01-01
hi,hello
1234567890
street number 6
nashik
EOF` )

echo -n '{"name":"subhash","dob":"2000-01-01","hobbies":["hi","hello"],"ph-no":"1234567890","address":["street number 6","nashik"]}' > /tmp/expected.json

expectedPROMPTS=$( echo "Enter name Enter dob Enter hobbies Enter phone number Enter address line 1 Enter address line 2 Thank You!" )

diff form.json /tmp/expected.json

if [[ ${PROMPTS} ==  ${expectedPROMPTS}  ]]
then
  echo 'Pass'
  else 
  echo 'Fail'
fi