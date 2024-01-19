"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maincontroller_1 = require("../controllers/maincontroller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/wallet/fund").post(auth_1.verifyToken, maincontroller_1.fundWallet);
router.route("/transfer/single-transaction").post(auth_1.verifyToken, maincontroller_1.makeSingleTransfer);
router.route("/transfer/multiple-transactions").post(auth_1.verifyToken, maincontroller_1.makeMultipleTransactions);
router.route("/wallet/withdraw").post(auth_1.verifyToken, maincontroller_1.withdrawFunds);
router.route("/testuser").get(auth_1.verifyToken, maincontroller_1.testUser);
exports.default = router;
//# sourceMappingURL=mainroute.js.map