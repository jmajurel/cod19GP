import Doctor from "../../models/doctor";

export default interface IDoctorService {
  getAll(): Promise<Doctor[]>;
  getById(id: string): Promise<Doctor>;
  getByEmail(email: string): Promise<Doctor>;
  create(newProfile: Doctor): Promise<Doctor>;
  update(id: string, profile: Doctor): Promise<void>;
}
