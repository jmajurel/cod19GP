import ISpecialityRepository from "./interfaces/specialityRepoInterface";
import Speciality from "../models/speciality";
import { Db } from "mongodb";

export default class SpecialityRepository implements ISpecialityRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async getAll(): Promise<Speciality[]> {
    return (await this.dbClient
      .collection("specialities")
      .find({})
      .toArray()) as Promise<Speciality[]>;
  }
  getById(): Promise<Speciality> {
    throw new Error("Method not implemented.");
  }
}
