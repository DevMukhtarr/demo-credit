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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFunds = exports.transferFunds = exports.fundWallet = void 0;
require("dotenv/config");
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            message: "An error occured" + error
        });
    }
});
exports.fundWallet = fundWallet;
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured" + error
        });
    }
});
exports.transferFunds = transferFunds;
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured"
        });
    }
});
exports.withdrawFunds = withdrawFunds;
//# sourceMappingURL=maincontroller.js.map