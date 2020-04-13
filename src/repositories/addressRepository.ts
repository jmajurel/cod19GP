import IAddressRepository from "./interfaces/addressRepoInterface";
import { Db, ObjectId, InsertOneWriteOpResult } from "mongodb";
import Address from "../models/address";

export default class AddressRepository implements IAddressRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async update(id: string, address: Address): Promise<void> {
    return await this.dbClient
      .collection("addresses")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...address } })
      .then();
  }
  async getAll(): Promise<Address[]> {
    return await (this.dbClient
      .collection("addresses")
      .find({})
      .toArray() as Promise<Address[]>);
  }
  async getById(id: string): Promise<Address> {
    return await this.dbClient
      .collection("addresses")
      .findOne({ _id: new ObjectId(id) });
  }
  async create(newAdress: Address): Promise<Address> {
    return await this.dbClient
      .collection("addresses")
      .insertOne(newAdress)
      .then(
        (result: InsertOneWriteOpResult<Address>): Address => result.ops[0]
      );
  }
}
