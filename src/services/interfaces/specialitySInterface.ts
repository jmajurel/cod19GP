import Speciality from "../../models/speciality";

export default interface ISpecialityService {
  getAll(): Promise<Speciality[]>;
  getById(id: string): Promise<Speciality>;
  create(newSpeciality: Speciality): Promise<Speciality>;
}
