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
exports.withdrawFunds = exports.transferFunds = exports.fundWallet = exports.makeMultipleTransactions = exports.makeSingleTransfer = exports.testUser = void 0;
const testtransactions_1 = require("../config/testtransactions");
const utils_1 = require("../config/utils");
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const config = process.env;
const squadcoPrivateKey = config.SQUADCOPRIVATEKEY;
const headers = {
    Authorization: `Bearer ${squadcoPrivateKey}`,
};
const testUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    console.log(user);
});
exports.testUser = testUser;
const makeSingleTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transfer = yield axios_1.default.post(`https://sandbox-api-d.squadco.com/payout/transfer`, {
            "remark": "Second single transaction test",
            "bank_code": "000013",
            "currency_id": "NGN",
            "amount": "10000",
            "account_number": "0123456789",
            "transaction_reference": "SBLYDJBXZZ_123478",
            "account_name": "BOLUS PAUL"
        }, { headers });
        if (transfer.status == 200) {
            return res.status(200).json({
                status: true,
                message: "Transfer Sucessful",
                data: {
                    success: transfer.data
                }
            });
        }
        else if (transfer.status == 401) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized"
            });
        }
        else if (transfer.status == 403) {
            return res.status(403).json({
                status: false,
                message: "Forbidden",
            });
        }
    }
    catch (error) {
        console.log(error.response);
        return res.status(500).json({
            status: false,
            message: "An error occured " + error,
        });
    }
});
exports.makeSingleTransfer = makeSingleTransfer;
const makeMultipleTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchSize = 5;
        const batchTransactions = (transactions, batchSize) => __awaiter(void 0, void 0, void 0, function* () {
            for (let i = 0; i < transactions.length; i += batchSize) {
                const batch = transactions.slice(i, i + batchSize);
                yield sendBatch(batch);
            }
        });
        const sendBatch = (batch) => __awaiter(void 0, void 0, void 0, function* () {
            const responses = [];
            for (const transaction of batch) {
                try {
                    const makeTransaction = yield axios_1.default.post('https://sandbox-api-d.squadco.com/payout/transfer', transaction, {
                        headers,
                    });
                    responses.push({
                        status: makeTransaction.status,
                        data: makeTransaction.data,
                    });
                }
                catch (error) {
                    responses.push({
                        status: error.response ? error.response.status : 500,
                        error: error.message,
                    });
                }
            }
            return responses;
        });
        batchTransactions(testtransactions_1.transactions, batchSize);
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occured " + error
        });
    }
});
exports.makeMultipleTransactions = makeMultipleTransactions;
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const headers = {
        Authorization: `Bearer ${squadcoPrivateKey}`,
    };
    const user = res.locals.user;
    try {
        const sendMoney = yield axios_1.default.post(`https://sandbox-api-d.squadco.com/transaction/initiate`, {
            "amount": amount * 100,
            "email": user.email,
            "currency": "NGN",
            "initiate_type": "inline",
            "transaction_ref": (0, utils_1.generateTransactionReference)(),
            "callback_url": "http://squadco.com"
        }, { headers });
        if (sendMoney.status == 200) {
            return res.status(200).json({
                status: true,
                message: "Transaction successful",
                data: {
                    info: sendMoney.data
                }
            });
        }
        else if (sendMoney.status == 401) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized"
            });
        }
        else if (sendMoney.status == 400) {
            return res.status(400).json({
                status: false,
                message: "Bad request",
            });
        }
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