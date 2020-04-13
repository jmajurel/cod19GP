import IDoctorRepository from "./interfaces/doctorRepoInterface";
import Doctor from "../models/doctor";
import { Db, ObjectId, InsertOneWriteOpResult } from "mongodb";

export default class DoctorRepository implements IDoctorRepository {
  private readonly dbClient: Db;

  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }

  async getAll(): Promise<Doctor[]> {
    return this.dbClient.collection("doctors").find({}).toArray() as Promise<
      Doctor[]
    >;
  }
  async getById(id: string): Promise<Doctor> {
    return this.dbClient
      .collection("doctors")
      .findOne({ _id: new ObjectId(id) });
  }

  async create(newProfile: Doctor): Promise<Doctor> {
    return await this.dbClient
      .collection("doctors")
      .insertOne(newProfile)
      .then((result: InsertOneWriteOpResult<Doctor>): Doctor => result.ops[0]);
  }

  async update(id: string, profile: Doctor): Promise<void> {
    return await this.dbClient
      .collection("doctors")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...profile } })
      .then();
  }
}
