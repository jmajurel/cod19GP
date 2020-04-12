import Address from "../../models/address";

export default interface IAddressRepository {
  getById(id: string): Promise<Address>;
  create(newAdress: Address): Promise<Address>;
}
