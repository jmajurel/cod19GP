import Doctor from "../../models/doctor";
import Address from "../../models/address";
import Speciality from "../../models/speciality";

import { Db, ObjectId } from "mongodb";

const londonAddress: Address = {
  _id: new ObjectId(1),
  address1: "28 King's road",
  address2: "Basement flat",
  city: "London",
  postCode: "SW1O",
  state: "England",
  country: "UK",
};

const allergist: Speciality = {
  _id: new ObjectId(1),
  name: "Allergist",
  translation: {
    en: "Allergist",
    fr: "Allergologue",
  },
};
/*
const parisAddress: Address = {
  _id: new ObjectId(2),
  address1: "24 Rue des Belles Feuilles",
  address2: "",
  city: "Paris",
  postCode: "75116",
  state: "Ile de France",
  country: "France",
};*/

const DoctorSmith: Doctor = {
  _id: new ObjectId(1),
  email: "smith.paul@gmail.com",
  firstName: "Paul",
  lastName: "Smith",
  address: londonAddress,
  specialityId: allergist._id.toString(),
};

class DoctorStore {
  public doctors: Doctor[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.doctors = [];
    this.dbClient = dbClient;
    this.add(DoctorSmith);
  }

  add(newDoctor: Doctor): this {
    this.doctors.push(newDoctor);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.doctors.length; i++) {
      promises.push(
        this.dbClient.collection("doctors").insertOne(this.doctors[i])
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default DoctorStore;
