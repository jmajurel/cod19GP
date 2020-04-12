import Address from "../../models/address";

export default interface IAddressService {
  getById(id: string): Promise<Address>;
  create(newAddress: Address): Promise<Address>;
}
