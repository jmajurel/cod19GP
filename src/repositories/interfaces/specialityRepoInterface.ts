import Speciality from "../../models/speciality";

export default interface ISpecialityRepository {
  getAll(): Promise<Speciality[]>;
  getById(): Promise<Speciality>;
}
