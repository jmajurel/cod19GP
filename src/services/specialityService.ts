import Speciality from "../models/speciality";
import ISpecialityService from "./interfaces/specialitySInterface";
import { Db } from "mongodb";

export default class SpecialityService implements ISpecialityService {
  private readonly dbClient: Dd;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  getAll(): Promise<Speciality[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Speciality> {
    throw new Error("Method not implemented.");
  }
}
