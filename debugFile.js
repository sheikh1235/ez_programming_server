const { spawn } = require("child_process");
const { resolve } = require("path");


let nextOutput;
let gdb;

// runs the gdb debugger on the code whose output is already made.
const debugFile = (outputPath, breakpoint) => {
  return new Promise((resolve, reject) => {
    // create executable with degug information

    gdb = spawn(`gdb`, [`${outputPath}`]);
    gdb.stdout.on("data", (data) => {
      // checks if statement contains = then return the data.
      const output = `${data}`;
      if (nextFlag) {
        nextOutput = output;
        dataWritten = true;
      }
      
    });
    gdb.stderr.on("data", (data) => {
      console.log(`stderror: ${data}`);
    });
    gdb.on("error", (data) => {
      console.log(`error: ${data}`);
      const err = { message: `${data}` };
      reject(err);
    });

    gdb.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
    });

    gdb.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
    });

    gdb.stdin.write("break main" + "\n");
    gdb.stdin.write("r\n");
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

// move debugger to next logic
let dataWritten = false;
let nextFlag = false;
const next = (command) => {
  nextFlag = true;
  gdb.stdin.write(command+"\n");
  return new Promise((resolve, reject) => {
    
    const wait = setInterval(() => {
      if (dataWritten) {    
        clearInterval(wait);
        resolve(nextOutput);
        nextFlag = false;
        dataWritten = false;
      }
    }, 50);
  }); 
};


const end = () => {
  gdb.stdin.end();
};
module.exports = {
  debugFile,
  next,
  end,
};
