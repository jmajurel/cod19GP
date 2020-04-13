import Doctor from "../models/doctor";
import IDoctorService from "./interfaces/doctorSInterface";
import IDoctorRepository from "../repositories/interfaces/doctorRepoInterface";

export default class DoctorService implements IDoctorService {
  private readonly doctorRepository: IDoctorRepository;
  constructor({ doctorRepository }: { doctorRepository: IDoctorRepository }) {
    this.doctorRepository = doctorRepository;
  }

  async getAll(): Promise<Doctor[]> {
    return await this.doctorRepository.getAll();
  }

  async getById(id: string): Promise<Doctor> {
    return await this.doctorRepository.getById(id);
  }

  async create(newProfile: Doctor): Promise<Doctor> {
    return await this.doctorRepository.create(newProfile);
  }

  async update(id: string, profile: Doctor): Promise<void> {
    return await this.doctorRepository.update(id, profile);
  }
}
