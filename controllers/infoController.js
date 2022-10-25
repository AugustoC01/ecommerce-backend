const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.argv;

const getInfo = (req, res) => {
  const data = {
    ARGS: JSON.stringify(args),
    OS: process.platform,
    NODEV: process.version,
    MEMORY: process.memoryUsage.rss(),
    PATH: process.execPath,
    PID: process.pid,
    FOLDER: process.cwd(),
  };
  res.status(200).render('mainInfo', data);
};

module.exports = { getInfo };
