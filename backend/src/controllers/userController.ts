import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Address } from "../models/addressModel";
import { userService } from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const savedUser = await userService.createUser(req.body);
    res.status(200).send({ user: savedUser });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );

    res.status(200).send({ user: updatedUser });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.userId);

    res.status(200).send({ user: deletedUser });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};
