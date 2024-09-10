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

router.get("/user/address", authenticateToken, getUserAddresses);
router.post("/user/address", authenticateToken, addUserAddress);
router.get("/user/address/:addressId", authenticateToken, getUserAddressById);
router.patch("/user/address/:addressId", authenticateToken, updateUserAddress);
router.delete("/user/address/:addressId", authenticateToken, deleteUserAddress);

export default router;
