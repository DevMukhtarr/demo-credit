"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const profilecontroller_1 = require("../controllers/profilecontroller");
const router = (0, express_1.Router)();
router.route("/edit-profile").post(auth_1.verifyToken, profilecontroller_1.editProfile);
router.route("/profile").get(auth_1.verifyToken, profilecontroller_1.getProfile);
exports.default = router;
//# sourceMappingURL=profileroute.js.map