import { AuthErrorMessage } from "../enums/authErrorMessage";
import { Auth } from "../models/authModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userService } from "./userService";

const secretKey = process.env.JWT_SECRET || "secret-key";
console.log("🚀 ~ secretKey:", secretKey);

export const authService = {
  register: async (authData: any) => {
    try {
      const { username, password } = authData;

      const user = await userService.createUser(authData);

      const hashedPassword = await bcrypt.hash(password, 12);

      const auth = new Auth({
        username,
        password: hashedPassword,
        userId: user._id,
      });
      await auth.save();
      return auth;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  login: async (username: string, password: string) => {
    try {
      const auth = await findAuth(username);
      await validatePassword(password, auth.password);
      const token = generateToken(auth._id.toString());
      return { token, userId: auth.userId };
    } catch (err: any) {
      throw new Error(AuthErrorMessage.AUTHENTICATION_FAILED);
    }
  },
};

const findAuth = async (username: string) => {
  const user = await Auth.findOne({ username });
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
