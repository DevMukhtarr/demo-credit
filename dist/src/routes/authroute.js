"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const router = (0, express_1.Router)();
router.route("/signup").post(authcontroller_1.signUp);
router.route("/signin").post(authcontroller_1.signIn);
exports.default = router;
//# sourceMappingURL=authroute.js.map