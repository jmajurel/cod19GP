import Speciality from "../models/speciality";
import ISpecialityService from "./interfaces/specialitySInterface";
import { Db } from "mongodb";
import ISpecialityRepository from "../repositories/interfaces/specialityRepoInterface";

export default class SpecialityService implements ISpecialityService {
  private readonly specialityRepository: ISpecialityRepository;
  constructor({
    specialityRepository,
  }: {
    specialityRepository: ISpecialityRepository;
  }) {
    this.specialityRepository = specialityRepository;
  }
  async getAll(): Promise<Speciality[]> {
    return await this.specialityRepository.getAll();
  }
  async getById(id: string): Promise<Speciality> {
    return await this.specialityRepository.getById(id);
  }
  async create(newSpeciality: Speciality): Promise<Speciality> {
    return await this.specialityRepository.create(newSpeciality);
  }
}
