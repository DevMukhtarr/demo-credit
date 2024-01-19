import { Router } from "express";
import { 
    fundWallet,
    makeSingleTransfer,
    makeMultipleTransactions,
} from "../controllers/maincontroller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

router.route("/wallet/fund").post(verifyToken, fundWallet)
router.route("/transfer/single-transaction").post(verifyToken, makeSingleTransfer)
router.route("/transfer/multiple-transactions").post(verifyToken, makeMultipleTransactions)
export default router;