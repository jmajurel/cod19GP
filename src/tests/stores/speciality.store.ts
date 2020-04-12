import Speciality from "../../models/speciality";
import { Db, ObjectId } from "mongodb";

const allergist: Speciality = {
  _id: new ObjectId(1),
  name: "Allergist",
  translation: {
    en: "Allergist",
    fr: "Allergologue",
  },
};

const cardiologist: Speciality = {
  _id: new ObjectId(2),
  name: "Cardiologists",
  translation: {
    en: "Cardiologist",
    fr: "Cardiologue",
  },
};

class SpecialityStore {
  public specialities: Speciality[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.specialities = [];
    this.dbClient = dbClient;
    this.add(allergist).add(cardiologist);
  }

  add(newSpeciality: Speciality): this {
    this.specialities.push(newSpeciality);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.specialities.length; i++) {
      promises.push(
        this.dbClient.collection("specialities").insertOne(this.specialities[i])
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default SpecialityStore;
