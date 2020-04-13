import { MongoClient, Db } from "mongodb";
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
  it("get all addresses", async () => {
    const service: AddressService = container.resolve("addressService");

    const results = await service.getAll();
    expect(results).toBeTruthy();
    expect(results.length).toBeGreaterThan(0);
  });

  it("get one address", async () => {
    const service: AddressService = container.resolve("addressService");
    const store: AddressStore = container.resolve("addressStore");
    const addresses = await service.getAll();

    const target = addresses[1];

    const foundAddress = await service.getById(target._id.toString());
    expect(foundAddress).toBeTruthy();
    expect(foundAddress._id.toString()).toBe(target._id.toString());
  });
});

describe("insert", () => {
  it("create a new address", async () => {
    const service: AddressService = container.resolve("addressService");
    const mockAddress: Address = {
      _id: null,
      address1: "26A mock street",
      address2: "20th floor",
      postCode: "NY 10013",
      city: "New York",
      country: "USA",
      state: "New York",
    };
    const newlyCreatedAddress = await service.create(mockAddress);
    expect(newlyCreatedAddress).toBeTruthy();
    expect(newlyCreatedAddress._id).toBeDefined();
  });
});

describe("update", () => {
  it("update an exisitng addres", async () => {
    const service: AddressService = container.resolve("addressService");
    const existingAddresses = await service.getAll();
    const target = existingAddresses[1];
    target.address1 = "Mock address for update testing";
    await service.update(target._id.toString(), target);

    const updatedAddress = await service.getById(target._id.toString());
    expect(updatedAddress).toBeTruthy();
    expect(updatedAddress.address1).toBe(target.address1);
  });
});
