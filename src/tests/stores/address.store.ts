import Address from "../../models/address";
import { Db, ObjectId } from "mongodb";

const addressLondon: Address = {
  _id: new ObjectId(1),
  address1: "28 King's road",
  address2: "Basement flat",
  city: "London",
  postCode: "SW1O",
  state: "England",
  country: "UK",
};

const addressParis: Address = {
  _id: new ObjectId(2),
  address1: "24 Rue des Belles Feuilles",
  address2: "",
  city: "Paris",
  postCode: "75116",
  state: "Ile de France",
  country: "France",
};

class AddressStore {
  public addresses: Address[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.addresses = [];
    this.dbClient = dbClient;
    this.add(addressLondon).add(addressParis);
  }

  add(newAddress: Address): this {
    this.addresses.push(newAddress);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.addresses.length; i++) {
      promises.push(
        this.dbClient.collection("addresses").insertOne(this.addresses[i])
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default AddressStore;
