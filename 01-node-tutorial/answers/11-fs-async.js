const { writeFile } = require('fs');

console.log('start');

writeFile('./temporary/fileB.txt', 'This is line 1\n', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('at point 1');

  writeFile('./temporary/fileB.txt', 'This is line 2\n', { flag: 'a' }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('at point 2');

    writeFile('./temporary/fileB.txt', 'This is line 3\n', { flag: 'a' }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('at point 3');
      console.log('All lines written successfully.');
    });
  });
});

console.log('starting next task');
