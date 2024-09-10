import { Router } from "express";
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddressById,
  getUserAddresses,
  updateUserAddress,
} from "../controllers/addressController";
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.get("/user/:userId/address", authenticateToken, getUserAddresses);
router.post("/user/:userId/address", authenticateToken, addUserAddress);
router.get(
  "/user/:userId/address/:addressId",
  authenticateToken,
  getUserAddressById
);
router.patch(
  "/user/:userId/address/:addressId",
  authenticateToken,
  updateUserAddress
);
router.delete(
  "/user/:userId/address/:addressId",
  authenticateToken,
  deleteUserAddress
);

export default router;
