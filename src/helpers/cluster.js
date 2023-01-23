const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { PORT, MODE } = require("../config");
const { errorLogger } = require("./logger");

const clusterHandle = (httpServer) => {
  if (cluster.isMaster) {
    if (MODE === "cluster") {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    } else {
      cluster.fork();
    }
    cluster.on("exit", () => {
      cluster.fork();
    });
  } else {
    httpServer.listen(PORT);
    httpServer.on("error", (error) =>
      errorLogger(`Error en el servidor ${error}`)
    );
  }
};

module.exports = clusterHandle;
