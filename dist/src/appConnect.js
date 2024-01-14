"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./config/connect"));
const app = (0, express_1.default)();
const authroute_1 = __importDefault(require("./routes/authroute"));
const mainroute_1 = __importDefault(require("./routes/mainroute"));
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.json());
app.use(connect_1.default);
app.use(authroute_1.default);
app.use(mainroute_1.default);
exports.default = app;
//# sourceMappingURL=appConnect.js.map