import DoctorDTO from "./doctorDTO";
import Doctor from "../../models/doctor";
import Speciality from "../../models/speciality";

export default class DoctorAssembler {
  public writeDTO(doctor: Doctor, speciality: Speciality): DoctorDTO {
    const doctorDTO = Object.assign(new DoctorDTO(), doctor);
    delete doctorDTO.specialityId;
    doctorDTO.speciality = speciality;
    return doctorDTO;
  }
}
