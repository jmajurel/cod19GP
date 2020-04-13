import Address from "../../models/address";

export default interface IAddressService {
  getAll(): Promise<Address[]>;
  getById(id: string): Promise<Address>;
  create(newAddress: Address): Promise<Address>;
  update(id: string, address: Address): Promise<void>;
}
