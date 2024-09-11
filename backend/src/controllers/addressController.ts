import { Request, Response } from "express";
import { addressService } from "../services/addressService";
import { AddressSuccessMessage } from "../enums/addressSuccessMessage";
import { decodeToken } from "../utils/decodeToken";

export const getUserAddresses = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const filter = req.query;
    const addresses = await addressService.getAddresses(userId, filter);

    res.status(200).send(addresses);
  } catch (err: any) {
    res.status(404).send({ error: err.message });
  }
};

export const getUserAddressById = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const { addressId } = req.params;

    const address = await addressService.getAddressById(userId, addressId);

    res.status(200).send(address);
  } catch (err: any) {
    res.status(404).send({ error: err.message });
  }
};

export const addUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");

    const address = await addressService.createAddress(userId, req.body);
    res.status(201).send(address);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const updateUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");
    const { addressId } = req.params;

    const address = await addressService.updateAddress(
      userId,
      addressId,
      req.body
    );

    res.status(200).send(address);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const deleteUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = decodeToken(req.headers.authorization || "");

    const address = await addressService.deleteAddressById(
      userId,
      req.params.addressId
    );

    res.status(200).send({ message: AddressSuccessMessage.DELETE });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};
