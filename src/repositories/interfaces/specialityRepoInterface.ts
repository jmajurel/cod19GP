import Speciality from "../../models/speciality";

export default interface ISpecialityRepository {
  getAll(): Promise<Speciality[]>;
  getById(id: string): Promise<Speciality>;
}
