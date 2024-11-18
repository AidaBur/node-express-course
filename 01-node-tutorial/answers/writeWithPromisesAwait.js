const fs = require ('fs');
const path = require('path');
const filePath = path.join(__dirname, 'temp.txt');

async function createAndReadFile() {
    try{

        await fs.promises.writeFile(filePath, 'Hello, Aida');
        console.log('The file was successfully created and the data was recorded.');

        const data = await fs.promises.readFile(filePath, 'utf-8');
        console.log ('File content:', data);
    } catch (error) {
        console.error ('An error has occurred:', error);
    }

}

createAndReadFile();