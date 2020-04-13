import IAddressRepository from "./interfaces/addressRepoInterface";
import { Db } from "mongodb";
import Address from "../models/address";

export default class AddressRepository implements IAddressRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async getById(id: string): Promise<Address> {
    return await this.dbClient.collection("addresses").findOne({ _id: id });
  }
  create(newAdress: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
}
