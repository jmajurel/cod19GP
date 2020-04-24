import { MongoClient, Db, ObjectId } from "mongodb";
const { MongoMemoryServer } = require("mongodb-memory-server");
import DoctorStore from "./stores/doctor.store";
import SpecialityStore from "./stores/speciality.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";

import DoctorService from "../services/doctorService";
import SpecialityService from "../services/specialityService";
import DoctorRepository from "../repositories/doctorRepository";
import SpecialityRespository from "../repositories/specialityRepository";
import Doctor from "../models/doctor";
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
    doctorService: asClass(DoctorService).scoped(),
    specialityService: asClass(SpecialityService).scoped(),
    doctorRepository: asClass(DoctorRepository).scoped(),
    specialityRepository: asClass(SpecialityRespository).scoped(),
    doctorStore: asClass(DoctorStore).scoped(),
    specialityStore: asClass(SpecialityStore).scoped(),
    dbClient: asValue(db),
  });

  const store: DoctorStore = container.resolve("doctorStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all doctor profiles", async () => {
    const service: DoctorService = container.resolve("doctorService");

    const results = await service.getAll();
    expect(results).toBeTruthy();
    expect(results.length).toBeGreaterThan(0);
  });

  it("get an existing doctor profile from its id", async () => {
    const service: DoctorService = container.resolve("doctorService");
    const results = await service.getAll();
    const target = results[0];
    const foundProfile = await service.getById(target._id.toString());
    expect(foundProfile).toBeTruthy();
    expect(foundProfile._id.toString()).toBe(target._id.toString());
  });

  it("get a doctor profile from email", async () => {
    const service: DoctorService = container.resolve("doctorService");
    const targetProfileEmail = "smith.paul@gmail.com";
    const foundProfile = await service.getByEmail(targetProfileEmail);

    expect(foundProfile).toBeTruthy();
    expect(foundProfile.email).toBe(targetProfileEmail);
  });
});

describe("insert", () => {
  it("create an new doctor profile", async () => {
    const service: DoctorService = container.resolve("doctorService");

    const specialityStore: SpecialityStore = container.resolve(
      "specialityStore"
    );
    await specialityStore.mount();
    const serviceSpeciality: SpecialityService = container.resolve(
      "specialityService"
    );
    const speciality = (await serviceSpeciality.getAll())[0];

    const newProfile: Doctor = {
      _id: new ObjectId(1),
      email: "mock.account@gmail.com",
      firstName: "John",
      lastName: "Richards",
      specialityId: speciality._id.toString(),
      address: {
        _id: new ObjectId(1),
        address1: "28 King's road",
        address2: "Basement flat",
        city: "London",
        postCode: "SW1O",
        state: "England",
        country: "UK",
      },
    };
    const newlyCreatedProfile = await service.create(newProfile);
    expect(newlyCreatedProfile).toBeTruthy();
    expect(newlyCreatedProfile._id).toBeDefined();
  });
});

describe("update", () => {
  it("update an existing doctor profile", async () => {
    const service: DoctorService = container.resolve("doctorService");

    const target = (await service.getAll())[0];
    const id = target._id.toString();
    target.firstName = "Scarlette";
    target.lastName = "Johansson";

    await service.update(id, target);

    const updatedProfile = await service.getById(id);

    expect(updatedProfile).toBeTruthy();
    expect(updatedProfile._id.toString()).toBe(id);
    expect(updatedProfile.firstName).toBe(target.firstName);
    expect(updatedProfile.lastName).toBe(target.lastName);
  });
});
