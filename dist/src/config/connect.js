"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app = (0, express_1.default)();
const mongoUri = (_a = process.env.MONGO_URI_LOCAL) !== null && _a !== void 0 ? _a : '';
if (!mongoUri) {
    console.error('MONGO_URI_LOCAL is not defined in the environment variables.');
    process.exit(1); // Exit the process or handle the error as appropriate
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
    console.log("not able to connect to database" + err);
});
exports.default = app;
//# sourceMappingURL=connect.js.map