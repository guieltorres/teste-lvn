import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/decodeToken";
import { AuthErrorMessage } from "../enums/authErrorMessage";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = decodeToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: AuthErrorMessage.INVALID_TOKEN });
  }
}

module.exports = authenticateToken;
