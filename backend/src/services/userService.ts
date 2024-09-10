import { User } from "../models/userModel";
import { Address } from "../models/addressModel";
import { addressService } from "./addressService";
import { UserStatus } from "../enums/userStatus";
import { UserErrorMessage } from "../enums/userErrorMessage";

export const userService = {
  getUserById: async (userId: string) => {
    try {
      return await User.findById(userId).populate("addresses");
    } catch (err: any) {
      throw new Error(UserErrorMessage.USER_NOT_FOUND);
    }
  },

  createUser: async (userData: any) => {
    try {
      let addresses: string[] = [];
      if (userData.addresses) {
        const insertedAddresses = await addressService.insertAddresses(
          userData.addresses
        );
        addresses = insertedAddresses.map((address) => address._id);
      }

      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        age: userData.age,
        status: "active",
        addresses: addresses,
      });

      await newUser.save();
      return await newUser.populate("addresses");
    } catch (err) {
      throw new Error(UserErrorMessage.UNABLE_TO_SAVE_USER);
    }
  },

  updateUser: async (userId: string, userData: any) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(UserErrorMessage.USER_NOT_FOUND);
    }

    if (userData.addresses) {
      const addresses = await addressService.insertAddresses(
        userData.addresses
      );
      user.set({ ...userData, addresses });
    } else {
      user.set(userData);
    }
    return await user.save();
  },

  deleteUser: async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(UserErrorMessage.USER_NOT_FOUND);
    }

    user.status = UserStatus.INACTIVE;
    return await user.save();
  },
};
