import jwt from "jsonwebtoken";
import { secretKey } from "../constants/secret";
import { Types } from "mongoose";
import { AuthErrorMessage } from "../enums/authErrorMessage";

export const decodeToken = (token: string) => {
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, secretKey) as {
    userId: string;
    iat: number;
    exp: number;
  };
  if (expired(decoded.exp)) {
    throw new Error("Token expired");
  }
  if (!Types.ObjectId.isValid(decoded.userId)) {
    throw new Error(AuthErrorMessage.INVALID_TOKEN);
  }
  return decoded;
};

const expired = (exp: number) => {
  return Date.now() >= exp * 1000;
};
