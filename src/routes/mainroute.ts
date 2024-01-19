import { Router } from "express";
import { 
    fundWallet,
    transferFunds,
    withdrawFunds,
    makeSingleTransfer,
    makeMultipleTransactions,
    testUser
} from "../controllers/maincontroller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

router.route("/wallet/fund").post(verifyToken, fundWallet)
router.route("/transfer/single-transaction").post(verifyToken, makeSingleTransfer)
router.route("/transfer/multiple-transactions").post(verifyToken, makeMultipleTransactions)
router.route("/wallet/withdraw").post(verifyToken, withdrawFunds)
router.route("/testuser").get(verifyToken, testUser)

export default router;