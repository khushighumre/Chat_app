import express from "express";
import { protectRoute } from "../middleware/auth";
import { checkAuth, updateProfile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter