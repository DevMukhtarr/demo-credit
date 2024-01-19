"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    user_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    account_number: {
        type: String,
        trim: true
    },
    balance: {
        type: Number,
    },
    password: {
        type: String,
    },
    organization: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map