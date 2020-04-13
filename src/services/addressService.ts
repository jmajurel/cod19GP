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

  async getAll(): Promise<Address[]> {
    return await this.addressRepository.getAll();
  }
  async getById(id: string): Promise<Address> {
    return await this.addressRepository.getById(id);
  }
  async create(newAddress: Address): Promise<Address> {
    return await this.addressRepository.create(newAddress);
  }
  async update(id: string, address: Address): Promise<void> {
    return await this.addressRepository.update(id, address);
  }
}
