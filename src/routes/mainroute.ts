import { Router } from "express";
import { fundWallet,transferFunds,withdrawFunds } from "../controllers/maincontroller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

router.route("/wallet/fund").post(verifyToken, fundWallet)
router.route("/wallet/tranfer").post(verifyToken, transferFunds)
router.route("/wallet/withdraw").post(verifyToken, withdrawFunds)

export default router;