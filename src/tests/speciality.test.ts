import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import SpecialityStore from "./stores/speciality.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";

import SpecialityService from "../services/specialityService";
import SpecialityRepository from "../repositories/specialityRepository";
import Speciality from "../models/speciality";

const mongod = new MongoMemoryServer();

let connection: MongoClient;
let db: Db;
let container: AwilixContainer;

beforeAll(async () => {
  const url = await mongod.getConnectionString();
  const dbName = await mongod.getDbName();
  connection = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db(dbName);
  container = createContainer();
  container.register({
    specialityService: asClass(SpecialityService).scoped(),
    specialityRepository: asClass(SpecialityRepository).scoped(),
    specialityStore: asClass(SpecialityStore).scoped(),
    dbClient: asValue(db),
  });

  const store: SpecialityStore = container.resolve("specialityStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all specialities", async () => {
    const service: SpecialityService = container.resolve("specialityService");
    const store: SpecialityStore = container.resolve("specialityStore");
    const result = await service.getAll();
    expect(result).toBeTruthy();
    expect(result.length).toBe(store.specialities.length);
  });

  it("get one speciality", async () => {
    const service: SpecialityService = container.resolve("specialityService");
    const specialities = await service.getAll();
    const foundSpeciality = await service.getById(
      specialities[1]._id.toString()
    );
    expect(foundSpeciality).toBeTruthy();
    expect(foundSpeciality._id).toEqual(specialities[1]._id);
  });
});
