const fs = require ("fs");

const readStream = fs.createReadStream("../content/big.txt", {
    encoding: "utf8", 
    highWaterMark: 200,
});

let counter = 0;

readStream.on ("data", (chunk) => {
    counter ++;
    console.log('Received chunk #${counter}: ${chunk}');
});

readStream.on("end", () => {
    console.log('Total number of chunks received: ${counter}')
});

readStream.on("error", (err) => {
    console.log("Error reading the file:" , err);
});
