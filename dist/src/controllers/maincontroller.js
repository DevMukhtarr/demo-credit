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
const knexfile_1 = require("../../knexfile");
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const id = res.locals.user.user_id;
        const balance = yield (0, knexfile_1.db)('users').select('demowallet').where({
            id: id
        });
        const username_indb = yield (0, knexfile_1.db)('users').where({
            id: id
        });
        const username = JSON.parse(JSON.stringify(username_indb))[0].username;
        const balance_value = JSON.parse(JSON.stringify(balance))[0].demowallet;
        yield (0, knexfile_1.db)('users').where({
            id: id
        }).update({
            demowallet: balance_value + amount
        });
        yield (0, knexfile_1.db)('transaction_history').insert({
            username: username,
            transaction_reference: "funded wallet",
            credit: amount,
            debit: 0,
            balance: balance_value + amount
        });
        return res.status(200).json({
            status: true,
            message: "Wallet Funded successfully"
        });
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
        const { username, amount } = req.body;
        const id = res.locals.user.user_id;
        const receiver = yield (0, knexfile_1.db)('users').where({
            username: username
        });
        const sender = yield (0, knexfile_1.db)('users').where({
            id: id
        });
        const sender_username = JSON.parse(JSON.stringify(sender))[0].username;
        console.log(receiver);
        const receiver_username = JSON.parse(JSON.stringify(receiver))[0].username;
        if (receiver.length == 0) {
            return res.status(424).json({
                status: false,
                message: "receiver username does not exist"
            });
        }
        if (sender_username == username) {
            return res.status(424).json({
                status: false,
                message: "cannot send to self"
            });
        }
        else {
            const receiver_balance = JSON.parse(JSON.stringify(receiver))[0].demowallet;
            const sender_balance = JSON.parse(JSON.stringify(sender))[0].demowallet;
            if (sender_balance < amount) {
                return res.status(424).json({
                    status: false,
                    message: "insufficient balance"
                });
            }
            yield (0, knexfile_1.db)('users').where({
                id: id
            }).update({
                demowallet: sender_balance - amount
            });
            yield (0, knexfile_1.db)('users').where({
                username: username
            }).update({
                demowallet: receiver_balance + amount
            });
            if (sender_username) {
                yield (0, knexfile_1.db)('transaction_history').insert({
                    username: sender_username,
                    transaction_reference: "transferred funds",
                    credit: 0,
                    debit: amount,
                    balance: sender_balance + amount
                });
            }
            if (receiver_username) {
                yield (0, knexfile_1.db)('transaction_history').insert({
                    username: receiver_username,
                    transaction_reference: "received funds from " + sender_username,
                    credit: amount,
                    debit: 0,
                    balance: receiver_balance + amount
                });
            }
            return res.status(200).json({
                status: true,
                message: "Transferred successfully"
            });
        }
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
        const { amount } = req.body;
        const id = res.locals.user.user_id;
        const user = yield (0, knexfile_1.db)('users').where({
            id: id
        });
        const user_balance = JSON.parse(JSON.stringify(user))[0].demowallet;
        const username = JSON.parse(JSON.stringify(user))[0].username;
        if (amount > user_balance) {
            return res.status(424).json({
                status: false,
                message: "insufficient balance"
            });
        }
        yield (0, knexfile_1.db)('users').where({
            id: id
        }).update({
            demowallet: user_balance - amount
        });
        yield (0, knexfile_1.db)('transaction_history').insert({
            username: username,
            transaction_reference: "made withdrawal of " + amount + " demo credit",
            credit: 0,
            debit: amount,
            balance: user_balance - amount
        });
        return res.status(200).json({
            status: true,
            message: "withdrawal successful"
        });
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