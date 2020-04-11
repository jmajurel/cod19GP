import Address from "./address";
import Speciality from "./speciality";

export default class Doctor {
  _id: object;
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  speciality: Speciality;
}
