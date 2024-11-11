const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("timer", (msg) => {
    console.log("Timer event received: ", msg);
});

setInterval(() => {
    emitter.emit("timer", "Hi there");
}, 2000);

const waitForEvent = () => {
    return new Promise ((resolve) => {
        emitter.on("happens", (msg) => resolve(msg));
    });
};

const doWait = async () => {  
    const msg = await waitForEvent();  
    console.log("We got an event! Here it is: ", msg);  
  };  

  setTimeout(() => {
    emitter.emit("happens", "Hello World!");
  }, 5000);

  doWait();  
  