
require('dotenv').config()
console.log(__dirname);
console.log(process.env.MY_VAR);

console.log(__dirname)
setInterval(() => {
  console.log('hello world')
}, 1000)