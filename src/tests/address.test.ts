import { MongoClient, Db, ObjectId } from "mongodb";
const { MongoMemoryServer } = require("mongodb-memory-server");
import AddressStore from "./stores/address.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";

import AddressService from "../services/addressService";
import AddressRepository from "../repositories/addressRepository";
import Address from "../models/address";

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
    addressService: asClass(AddressService).scoped(),
    addressRepository: asClass(AddressRepository).scoped(),
    addressStore: asClass(AddressStore).scoped(),
    dbClient: asValue(db),
  });

  const store: AddressStore = container.resolve("addressStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get one address", async () => {
    const service: AddressService = container.resolve("addressService");
    const store: AddressStore = container.resolve("addressStore");
    const result = await service.getById("1");
    expect(result).toBeTruthy();
    expect(result._id).toBe(new ObjectId(1));
  });
});
