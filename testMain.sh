#! /bin/bash
node fillForm.js << EOF
subhash
2000-01-01
hi,hello
1234567890
EOF

echo -n '{"name":"subhash","dob":"2000-01-01","hobbies":["hi","hello"],"ph-no":"1234567890"}' > /tmp/expected.json

diff form.json /tmp/expected.json