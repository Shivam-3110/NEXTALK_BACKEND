
import express from "express";
const UserRouter  = express.Router();
import {checkAuth, signup,login,updateUserProfile } from "../config/controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.js";

UserRouter.post("/signup",signup);
UserRouter.post("/login",login);
UserRouter.put("/updateuserprofile",protectRoute,updateUserProfile);
UserRouter.get("/check",protectRoute,checkAuth);

export default UserRouter ; 