import { AddressErrorMessage } from "../enums/addressErrorMessage";
import { UserErrorMessage } from "../enums/userErrorMessage";
import { Address } from "../models/addressModel";
import { userService } from "./userService";

export const addressService = {
  getAddresses: async (userId: string, filter: any) => {
    try {
      const user = await userService.getUserById(userId);

      const filteredAddresses = user!.addresses.filter((address: any) => {
        return Object.keys(filter).every(
          (key) => address[key].toString() === filter[key]
        );
      });

      return filteredAddresses;
    } catch (err: any) {
      if (err.message === UserErrorMessage.USER_NOT_FOUND) {
        throw new Error(err.message);
      }
      throw new Error(AddressErrorMessage.UNABLE_TO_RETREIVE_ADDRESS);
    }
  },

  getAddressById: async (userId: string, addressId: string) => {
    try {
      const user = await userService.getUserById(userId);

      const address = user!.addresses.find(
        (address: any) => address._id.toString() === addressId
      );

      if (!address) {
        throw new Error(AddressErrorMessage.ADDRESS_NOT_FOUND);
      }
      return address;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  createAddress: async (userId: string, addressData: any) => {
    try {
      const user = await userService.getUserById(userId);

      const newAddress = new Address(addressData);
      await newAddress.save();
      user!.addresses.push(newAddress._id);
      await user!.save();

      return newAddress;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  updateAddress: async (
    userId: string,
    addressId: string,
    addressData: any
  ) => {
    try {
      const user = await userService.getUserById(userId);

      const address = user!.addresses.find(
        (address: any) => address._id.toString() === addressId
      );
      if (!address) {
        throw new Error(AddressErrorMessage.ADDRESS_NOT_FOUND);
      }
      return await Address.findByIdAndUpdate(addressId, addressData);
    } catch (err: any) {
      if (err.message === UserErrorMessage.USER_NOT_FOUND) {
        throw new Error(err.message);
      }
      throw new Error(AddressErrorMessage.ADDRESS_NOT_FOUND);
    }
  },

  deleteAddressById: async (userId: string, addressId: string) => {
    try {
      const user = await userService.getUserById(userId);

      const address = user!.addresses.find(
        (address: any) => address._id.toString() === addressId
      );

      if (!address) {
        throw new Error(AddressErrorMessage.ADDRESS_NOT_FOUND);
      }

      return await Address.findByIdAndDelete(addressId);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  insertAddresses: async (addresses: any[]) => {
    return await Address.insertMany(addresses);
  },
};
