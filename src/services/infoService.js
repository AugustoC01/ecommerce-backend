const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.argv;
const numCPUs = require("os").cpus().length;

const getInfo = () => {
  return {
    ARGS: JSON.stringify(args),
    OS: process.platform,
    NODEV: process.version,
    MEMORY: process.memoryUsage.rss(),
    PATH: process.execPath,
    PID: process.pid,
    FOLDER: process.cwd(),
    numCPUs: numCPUs,
  };
};

module.exports = { getInfo };
