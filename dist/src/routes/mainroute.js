"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maincontroller_1 = require("../controllers/maincontroller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/wallet/fund").post(auth_1.verifyToken, maincontroller_1.fundWallet);
router.route("/wallet/tranfer").post(auth_1.verifyToken, maincontroller_1.transferFunds);
router.route("/wallet/withdraw").post(auth_1.verifyToken, maincontroller_1.withdrawFunds);
exports.default = router;
//# sourceMappingURL=mainroute.js.map