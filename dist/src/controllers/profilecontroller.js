"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.editProfile = void 0;
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, user_name, email, old_password, new_password, confirm_password, organization } = req.body;
    try {
        const user_id = res.locals.user.user_id;
        const user = yield user_1.default.findById(user_id);
        if (!(yield bcryptjs_1.default.compare(old_password, user.password))) {
            return res.status(400).json({
                status: false,
                message: 'Password does not match',
            });
        }
        if (new_password !== confirm_password) {
            return res.status(400).json({
                status: false,
                message: 'Password does not match',
            });
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(new_password, 12);
        const userUpdates = {};
        if (req.body.first_name !== undefined)
            userUpdates.first_name = req.body.first_name;
        if (req.body.last_name !== undefined)
            userUpdates.last_name = req.body.last_name;
        if (req.body.user_name !== undefined)
            userUpdates.user_name = req.body.user_name;
        if (req.body.email !== undefined)
            userUpdates.email = req.body.email;
        if (req.body.password !== undefined)
            userUpdates.password = encryptedPassword;
        if (req.body.organization !== undefined)
            userUpdates.organization = req.body.organization;
        const updatedUser = yield user_1.default.findByIdAndUpdate(user_id, userUpdates, {
            new: true
        });
        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }
        const _a = updatedUser.toJSON(), { password, createdAt, account_number } = _a, userWithoutPassword = __rest(_a, ["password", "createdAt", "account_number"]);
        return res.status(200).json({
            status: true,
            message: 'Profile updated successfully',
            data: userWithoutPassword,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + error,
        });
    }
});
exports.editProfile = editProfile;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = res.locals.user.user_id;
        const user = yield user_1.default.findById(user_id);
        const _b = user.toJSON(), { password, createdAt, account_number } = _b, userWithoutSomeData = __rest(_b, ["password", "createdAt", "account_number"]);
        const profile = user;
        return res.status(200).json({
            status: true,
            message: "User profile",
            data: {
                userWithoutSomeData
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured " + error,
        });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=profilecontroller.js.map