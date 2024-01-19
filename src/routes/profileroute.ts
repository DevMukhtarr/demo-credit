import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { 
    editProfile, 
    } from "../controllers/profilecontroller";
const router = Router();

router.route("/edit-profile").post(verifyToken, editProfile)

export default router;