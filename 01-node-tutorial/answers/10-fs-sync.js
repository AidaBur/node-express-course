const { readFileSync, writeFileSync } = require('fs');

const filePath = './temporary/fileA.txt';

writeFileSync(filePath, 'First line\n');
writeFileSync(filePath, 'Second line\n', { flag: 'a' });
writeFileSync(filePath, 'Third line\n', { flag: 'a' });

const data = readFileSync(filePath, 'utf8');

console.log(data);
