import Address from "../../models/address";

export default interface IAddressRepository {
  getAll(): Promise<Address[]>;
  getById(id: string): Promise<Address>;
  create(newAdress: Address): Promise<Address>;
  update(id: string, address: Address): Promise<void>;
}
