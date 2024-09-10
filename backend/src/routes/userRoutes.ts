import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/userController";
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.get("/user/:userId", authenticateToken, getUser);
router.patch("/user/:userId", authenticateToken, updateUser);

export default router;
