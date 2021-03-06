import ISpecialityRepository from "./interfaces/specialityRepoInterface";
import Speciality from "../models/speciality";
import { Db, ObjectId, InsertOneWriteOpResult } from "mongodb";

export default class SpecialityRepository implements ISpecialityRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }

  async getAll(): Promise<Speciality[]> {
    return (
      await this.dbClient.collection("specialities").find({})
    ).toArray() as Promise<Speciality[]>;
  }

  async getById(id: string): Promise<Speciality> {
    return await this.dbClient
      .collection("specialities")
      .findOne({ _id: new ObjectId(id) });
  }

  async create(newSpeciality: Speciality): Promise<Speciality> {
    return await this.dbClient
      .collection("specialities")
      .insertOne(newSpeciality)
      .then(
        (result: InsertOneWriteOpResult<Speciality>): Speciality =>
          result.ops[0]
      );
  }
}
