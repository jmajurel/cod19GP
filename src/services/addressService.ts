import Address from "../models/address";
import IAddressService from "./interfaces/addressSInterface";
import IAddressRepository from "../repositories/interfaces/addressRepoInterface";

export default class AddressService implements IAddressService {
  private readonly addressRepository: IAddressRepository;
  constructor({
    addressRepository,
  }: {
    addressRepository: IAddressRepository;
  }) {
    this.addressRepository = addressRepository;
  }
  getById(id: string): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  create(newAddress: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
}
