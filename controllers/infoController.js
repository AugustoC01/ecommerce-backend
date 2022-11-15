const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.argv;
const numCPUs = require('os').cpus().length;

const getInfo = (req, res) => {
  const data = {
    ARGS: JSON.stringify(args),
    OS: process.platform,
    NODEV: process.version,
    MEMORY: process.memoryUsage.rss(),
    PATH: process.execPath,
    PID: process.pid,
    FOLDER: process.cwd(),
    numCPUs: numCPUs,
  };
  res.status(200).render('mainInfo', data);
};

module.exports = { getInfo };
