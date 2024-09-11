import { AuthErrorMessage } from "../enums/authErrorMessage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userService } from "./userService";
import { secretKey } from "../constants/secret";
import { User } from "../models/userModel";
import { UserStatus } from "../enums/userStatus";

export const authService = {
  register: async (authData: any) => {
    try {
      const user = await userService.createUser(authData);
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  login: async (username: string, password: string) => {
    try {
      const user = await findUser(username);
      if (user.status === UserStatus.INACTIVE) {
        throw new Error(AuthErrorMessage.ACCOUNT_INACTIVE);
      }
      await validatePassword(password, user.password);
      const token = generateToken(user._id.toString());
      return { token, userId: user._id };
    } catch (err: any) {
      throw new Error(AuthErrorMessage.AUTHENTICATION_FAILED);
    }
  },
};

const findUser = async (username: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error(AuthErrorMessage.AUTHENTICATION_FAILED);
  }
  return user;
};

const validatePassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, storedPassword);
  if (!isPasswordValid) {
    throw new Error(AuthErrorMessage.AUTHENTICATION_FAILED);
  }
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};
