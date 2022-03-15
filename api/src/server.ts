import 'reflect-metadata';
import httpServerConfig from "./config/server/HttpServerConfig";
import databaseConfig from "./config/db/DatabaseConfig";

const server = (databaseConfigModule = databaseConfig(), httpServerConfigModule = httpServerConfig()) => {
  return {
    start() {
      databaseConfigModule.config();
      httpServerConfigModule.config();
    }
  }
}

// start application
server().start();
