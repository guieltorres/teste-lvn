import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/userController";
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.get("/user", authenticateToken, getUser);
router.patch("/user", authenticateToken, updateUser);
router.delete("/user", authenticateToken, deleteUser);

export default router;
