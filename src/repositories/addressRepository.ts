import IAddressRepository from "./interfaces/addressRepoInterface";
import { Db } from "mongodb";
import Address from "../models/address";

export default class AddressRepository implements IAddressRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  getById(id: string): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  create(newAdress: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
}
