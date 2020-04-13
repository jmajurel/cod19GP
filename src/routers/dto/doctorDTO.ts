import Address from "../../models/address";
import Speciality from "../../models/speciality";

export default class DoctorDTO {
  _id: object;
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  speciality: Speciality;
}
