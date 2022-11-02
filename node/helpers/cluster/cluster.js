const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.default({ port: 8080, mode: 'fork' }).argv;

const { port, mode } = args;

/* const clusterServer = (port, mode, httpServer) => {
  httpServer.listen(port, () => {
    clusterHandle(mode, httpServer);
    console.log(`SERVER ON PORT http://localhost:${port}/`);
  });
};
*/

const clusterServer = (httpServer) => {
  httpServer.listen(port, () => {
    clusterHandle(mode, httpServer);
    console.log(`SERVER ON PORT http://localhost:${port}/`);
  });
};

const clusterHandle = (mode, server) => {
  if (cluster.isMaster) {
    // console.log(`Master ${process.pid} running`);
    if (mode === 'cluster') {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    } else {
      cluster.fork();
    }
    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    server;
    // console.log(`Worker ${process.pid} running`);
  }
};

module.exports = clusterServer;
