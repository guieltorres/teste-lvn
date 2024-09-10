import { Router } from "express";
import { getUser, updateUser } from "../controllers/userController";
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.get("/user", authenticateToken, getUser);
router.patch("/user", authenticateToken, updateUser);

export default router;
