import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { asClass, createContainer, asValue } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-express";
import SpecialityService from "./services/specialityService";
import SpecialityRepository from "./repositories/specialityRepository";

dotenv.config();
const app = express();
let connectionString = process.env.DB_CONNECTION_STRING;

connectionString = connectionString
  .replace("<dbuser>", process.env.DB_USER)
  .replace("<dbpassword>", process.env.DB_PWD);

async function configureContainer() {
  const container = createContainer();

  const dbConnection = (await MongoClient.connect(connectionString)).db(
    process.env.DB_NAME
  );
  container.register({
    specialityService: asClass(SpecialityService).scoped(),
    specialityRepository: asClass(SpecialityRepository).scoped(),
    dbClient: asValue(dbConnection),
  });

  return container;
}

configureContainer().then((container) => {
  app.use(scopePerRequest(container));

  app.use(loadControllers("routers/*.ts", { cwd: __dirname }));
  const PORT = process.env.PORT || 8083;

  app.listen(PORT, () => {
    console.log("cod19GP is listenning on port: ", PORT);
  });
});
