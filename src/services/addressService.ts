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
  async getById(id: string): Promise<Address> {
    return await this.addressRepository.getById(id);
  }
  create(newAddress: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
}
