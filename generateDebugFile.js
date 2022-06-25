const { exec } = require("child_process");
const fs = require("fs");

const path = require("path");

const dirOutput = path.join(__dirname, "outputs");

// generates ouput file of code with debug information
const generateDebugFile = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outputPath = path.join(dirOutput, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    // create executable with degug information

    const child = exec(
      `g++ ${filepath} -o ${outputPath} -g `,
      (error, stdout, stderr) => {
        if (error) {
          console.log("error", error);
          reject(error);
        } else if (stderr) {
          console.log("stderr", stderr);
          reject(stderr);
        } else {
          resolve(outputPath);
        }
      }
    );
  });
};

module.exports = {
  generateDebugFile,
};
