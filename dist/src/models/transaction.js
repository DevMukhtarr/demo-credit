"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.Transaction = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Enum representing transaction types
var TransactionType;
(function (TransactionType) {
    TransactionType["FUNDING"] = "FUNDING";
    TransactionType["MONEY_TRANSFER"] = "MONEY_TRANSFER";
})(TransactionType || (TransactionType = {}));
exports.TransactionType = TransactionType;
const transactionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [TransactionType.FUNDING, TransactionType.MONEY_TRANSFER],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    recipients: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'User',
    },
    transactionReference: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const Transaction = mongoose_1.default.model('Transaction', transactionSchema);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map