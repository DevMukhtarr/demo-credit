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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
// new user sign up
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, user_name, email, password, confirm_password } = req.body;
        if (!(first_name && last_name && email && password && confirm_password)) {
            return res.status(400).send("All inputs are required");
        }
        if (password !== confirm_password) {
            return res.status(409).json({
                status: false,
                message: "Password and confirm password does not match"
            });
        }
        // olduser 
        const Olduser = yield user_1.default.findOne({ email: email });
        if (Olduser) {
            return res.status(424).json({
                status: false,
                message: "user with this email exists"
            });
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield user_1.default.create({
            first_name,
            last_name,
            user_name,
            email: email,
            password: encryptedPassword
        });
        const jwt_token = jsonwebtoken_1.default.sign({
            user_id: newUser._id,
            email: email
        }, process.env.JWT_TOKEN_KEY, {
            expiresIn: "123d",
        });
        return res.status(200).json({
            status: true,
            message: "New user created succesfully",
            access_token: jwt_token
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred",
        });
    }
});
exports.signUp = signUp;
// signin 
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // validating user input
        if (!(email && password)) {
            return res.status(400).send("All inputs are required");
        }
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(409).json({
                status: false,
                message: "Incorrect email or password"
            });
        }
        const email_indb = JSON.parse(JSON.stringify(user))[0].email;
        if (email_indb == email) {
            const password_indb = JSON.parse(JSON.stringify(user))[0].password;
            const id_indb = JSON.parse(JSON.stringify(user))[0].id;
            if (yield bcryptjs_1.default.compare(password, password_indb)) {
                const jwt_token = jsonwebtoken_1.default.sign({
                    user_id: id_indb,
                    email: email
                }, process.env.JWT_TOKEN_KEY, {
                    expiresIn: "365",
                });
                return res.status(200).json({
                    status: true,
                    message: "user signed in succesfully",
                    access_token: jwt_token
                });
            }
            return res.status(424).json({
                status: false,
                message: "Incorrect email or password"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred",
        });
    }
});
exports.signIn = signIn;
//# sourceMappingURL=authcontroller.js.map