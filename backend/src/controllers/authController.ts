import { Request, Response } from "express";
import { authService } from "../services/authService";
import { AuthSuccessMessage } from "../enums/authSuccessMessage";
import { AuthErrorMessage } from "../enums/authErrorMessage";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).send({ message: AuthSuccessMessage.REGISTRATION_SUCCESS });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { token } = await authService.login(username, password);

    res.status(200).send({ token });
  } catch (err: any) {
    const code = err.message === AuthErrorMessage.ACCOUNT_INACTIVE ? 403 : 401;
    res.status(code).send({ error: err.message });
  }
};
