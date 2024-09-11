import { Request, Response } from "express";
import { authService } from "../services/authService";
import { AuthSuccessMessage } from "../enums/authSuccessMessage";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).send({ message: AuthSuccessMessage.REGISTRATION_SUCCESS });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { token, userId } = await authService.login(username, password);

    res.status(200).send({ token, userId });
  } catch (err: any) {
    res.status(401).send({ message: err.message });
  }
};
