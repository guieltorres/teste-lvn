import jwt from "jsonwebtoken";
import { secretKey } from "../constants/secret";

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
  return decoded;
};

const expired = (exp: number) => {
  return Date.now() >= exp * 1000;
};
