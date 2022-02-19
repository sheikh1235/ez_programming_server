const { exec } = require("child_process");

const fs = require("fs");

const stream = require("stream");

const path = require("path");

const dirOutput = path.join(__dirname, "outputs");

if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true });
}

const executeFile = (filepath, input) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outputPath = path.join(dirOutput, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const child = exec(
      `g++ ${filepath} -o ${outputPath} && cd ${dirOutput} && ./${jobId}.out`,
      (error, stdout, stderr) => {
        if (error) {
          console.log("error", error);
          reject(error);
        } else if (stderr) {
          console.log("stderr", stderr);
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );

    let inputStream = new stream.Readable();
    inputStream.push(input);
    inputStream.push(null);
    inputStream.pipe(child.stdin);
  });
};

module.exports = {
  executeFile,
};
