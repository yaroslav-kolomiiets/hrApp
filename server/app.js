import mongoose from "mongoose";
import http from "http";
import terminus from "@godaddy/terminus";

import config from "./config/config";
import app from "./config/express";

let server = null;

async function onSignal() {
  return new Promise(resolve => {
    if (server) {
      server.close(() => resolve());
    } else {
      resolve();
    }
  }).then(() => mongoose.connection.close());

  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck() {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

async function runServer() {
  server = http.createServer(app);

  terminus(server, {
    signal: "SIGINT",
    healthChecks: {
      "/health-check": onHealthCheck
    },
    onSignal
  });

  server
    .listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.info(`[server] started on port ${config.port} (${config.env})`);
    })
    .on("close", () => {
      // eslint-disable-next-line no-console
      console.info(`[server] close on port ${config.port}`);
    })
    .on("error", error => {
      if (error.syscall !== "listen") {
        throw error;
      }

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          // eslint-disable-next-line no-console
          console.error(
            `[server] port ${config.port} requires elevated privileges`
          );
          process.exit(1);
          break;

        case "EADDRINUSE":
          // eslint-disable-next-line no-console
          console.error(`[server] port ${config.port} is already in use`);
          process.exit(1);
          break;

        default:
          throw error;
      }
    });
}

async function run() {
  mongoose.set("bufferCommands", false); // Mongoose-specific buffering

  if (config.mongooseDebug) {
    mongoose.set("debug", true);
  }

  mongoose.connection.on("disconnected", () => {
    // eslint-disable-next-line no-console
    console.info(`[mongodb] disconnected at ${new Date().toISOString()}`);
  });
  mongoose.connection.on("reconnect", () => {
    // eslint-disable-next-line no-console
    console.info(`[mongodb] reconnected at ${new Date().toISOString()}`);
  });
  mongoose.connection.on("connected", () => {
    // eslint-disable-next-line no-console
    console.info(`[mongodb] connected at ${new Date().toISOString()}`);
  });
  mongoose.connection.on("reconnectFailed", () => {
    // eslint-disable-next-line no-console
    console.error(`[mongodb] reconnect failed at ${new Date().toISOString()}`);
    onSignal()
      .then(() => {
        process.exit(1);
      })
      .catch(error => {
        process.exit(1);
        // eslint-disable-next-line no-console
        console.error("[server] SIGUSR2 ", error);
      });
  });

  mongoose.connection.once("open", runServer);

  await mongoose
    .connect(`mongodb://${config.mongo.host}:${config.mongo.port}`, {
      bufferMaxEntries: 0, // MongoDB driver buffering
      keepAlive: 120,
      dbName: config.mongo.db
    })
    // eslint-disable-next-line no-console
    .catch(error => console.error("[mongodb]", error));
}

// eslint-disable-next-line no-console
run().catch(error => console.error("[server]", error));

// for nodemon
process.once("SIGUSR2", () => {
  onSignal()
    .then(() => {
      process.kill(process.pid, "SIGUSR2");
    })
    .catch(error => {
      process.kill(process.pid, "SIGUSR2");
      // eslint-disable-next-line no-console
      console.error("[server] SIGUSR2 ", error);
    });
});
