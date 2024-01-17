"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionReference = void 0;
const uuid_1 = require("uuid");
const generateTransactionReference = () => {
    return (0, uuid_1.v4)();
};
exports.generateTransactionReference = generateTransactionReference;
//# sourceMappingURL=utils.js.map