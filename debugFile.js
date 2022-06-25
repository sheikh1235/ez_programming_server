const { spawn } = require("child_process");
const { resolve } = require("path");


let nextOutput;
let gdb;
let nextFlag = false;
// runs the gdb debugger on the code whose output is already made.
const debugFile = (outputPath, breakpoint) => {
  return new Promise((resolve, reject) => {
    // create executable with degug information

    gdb = spawn(`gdb`, [`${outputPath}`]);
    gdb.stdout.on("data", (data) => {
      if (data.includes("=")) {
        // checks if statement contains = then return the data.
        const output = `${data}`;
        console.log("output message...\n\n" + output);
        console.log(output);
        if (nextFlag) {
          nextOutput = output;

          console.log("output message next...\n\n" + output);
          console.log(output);
          dataWritten = true;
        }

        resolve(output);
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

    gdb.stdin.write("info locals\n");
  });
};

// move debugger to next logic
let nextInfoWritten = false;
let dataWritten = false;

const next = () => {
  nextFlag = true;
  gdb.stdin.write("next\n");
  gdb.stdin.write("info locals\n");
  return new Promise((resolve, reject) => {
    
    const wait = setInterval(() => {
      if (dataWritten) {
        console.log("hello");    
        clearInterval(wait);
        console.log(dataWritten);
        console.log("next output: ", nextOutput);
        
        resolve(nextOutput);
      }
      else{
        console.log(dataWritten);
        reject();
      }
    }, 5000);
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
