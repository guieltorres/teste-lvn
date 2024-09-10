import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Address } from "../models/addressModel";
import { userService } from "../services/userService";
import { decodeToken } from "../utils/decodeToken";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const user = await userService.getUserById(userId);
    const responseUser = {
      _id: user!._id,
      name: user!.name,
      age: user!.age,
      email: user!.email,
      status: user!.status,
      addresses: user!.addresses,
    };
    res.status(200).send(responseUser);
  } catch (err: any) {
    res.status(404).send({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const savedUser = await userService.createUser(req.body);
    res.status(200).send({ user: savedUser });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const updatedUser = await userService.updateUser(userId, req.body);

    res.status(200).send({ user: updatedUser });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const deletedUser = await userService.deleteUser(userId);

    res.status(200).send({ user: deletedUser });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};
