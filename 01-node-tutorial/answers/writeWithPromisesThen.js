const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "First result\n")
  .then(() => writeFile("temp.txt", "Second result\n", { flag: "a" }))
  .then(() => writeFile("temp.txt", "Third result\n", { flag: "a" }))
  .then(() => readFile("temp.txt", "utf-8"))
  .then((data) => {
    console.log("File conent:\n", data);
  })

  .catch((error) => {
    console.log("An error occurred:", error);
  });
