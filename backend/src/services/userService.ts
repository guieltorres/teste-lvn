import { User } from "../models/userModel";
import { Address } from "../models/addressModel";
import { addressService } from "./addressService";
import { UserStatus } from "../enums/userStatus";
import { UserErrorMessage } from "../enums/userErrorMessage";
import bcrypt from "bcrypt";

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
      const hashedPassword = await bcrypt.hash(userData.password, 12);

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
        age: userData.age,
        status: UserStatus.ACTIVE,
        addresses: addresses,
        username: userData.username,
        password: hashedPassword,
      });

      await newUser.save();
      return await newUser.populate("addresses");
    } catch (err: any) {
      if (err.code === 11000) {
        throw new Error(UserErrorMessage.USER_ALREADY_EXISTS);
      }
      throw new Error(UserErrorMessage.UNABLE_TO_SAVE_USER);
    }
  },

  updateUser: async (userId: string, userData: any) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(UserErrorMessage.USER_NOT_FOUND);
    }

    if (userData.email && userData.email !== user.email) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error(UserErrorMessage.EMAIL_ALREADY_IN_USE);
      }
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

    if (!user || user.status === UserStatus.INACTIVE) {
      throw new Error(UserErrorMessage.USER_NOT_FOUND);
    }

    user.status = UserStatus.INACTIVE;
    return await user.save();
  },

  findUserByUsername: async (username: string) => {
    return await User.findOne({ username });
  },
};
