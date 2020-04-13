import Doctor from "../../models/doctor";

export default interface IDoctorRepository {
  getAll(): Promise<Doctor[]>;
  getById(id: string): Promise<Doctor>;
  create(newProfile: Doctor): Promise<Doctor>;
  update(id: string, profile: Doctor): Promise<void>;
}
