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
exports.verifyTransaction = exports.fundWallet = exports.makeMultipleTransactions = exports.makeSingleTransfer = void 0;
const user_1 = __importDefault(require("../models/user"));
const transaction_1 = require("../models/transaction");
const testtransactions_1 = require("../config/testtransactions");
const utils_1 = require("../config/utils");
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const config = process.env;
const squadcoPrivateKey = config.SQUADCOPRIVATEKEY;
const headers = {
    Authorization: `Bearer ${squadcoPrivateKey}`,
};
const makeSingleTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { remark, bank_code, amount, account_number, account_name } = req.body;
    try {
        const transactionReference = (0, utils_1.generateTransactionReference)();
        const transfer = yield axios_1.default.post(`https://sandbox-api-d.squadco.com/payout/transfer`, {
            "remark": remark,
            "bank_code": bank_code,
            "currency_id": "NGN",
            "amount": parseFloat(amount) * 100,
            "account_number": account_number,
            "transaction_reference": `SBLYDJBXZZ${transactionReference}`,
            "account_name": account_name
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
    const transactionReference = (0, utils_1.generateTransactionReference)();
    try {
        const sendMoney = yield axios_1.default.post(`https://sandbox-api-d.squadco.com/transaction/initiate`, {
            "amount": parseFloat(amount) * 100,
            "email": user.email,
            "currency": "NGN",
            "initiate_type": "inline",
            "transaction_ref": transactionReference,
            "callback_url": "http://squadco.com"
        }, { headers });
        if (sendMoney.status == 200) {
            yield user_1.default.findByIdAndUpdate(user.user_id, { $inc: { balance: amount } });
            yield transaction_1.Transaction.create({
                user: user.user_id,
                type: transaction_1.TransactionType.FUNDING,
                amount: parseFloat(amount),
                transactionReference: transactionReference,
                description: "Funding successful"
            });
            return res.status(200).json({
                status: true,
                message: "Transaction Processing, Follow checkout url to complete transaction",
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
const verifyTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            message: "An error occured" + error
        });
    }
});
exports.verifyTransaction = verifyTransaction;
//# sourceMappingURL=maincontroller.js.map