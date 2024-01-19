"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const appConnect_1 = __importDefault(require("./appConnect"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT;
appConnect_1.default.use((0, cors_1.default)());
appConnect_1.default.get('/', (req, res) => {
    res.send('transfuse!');
});
appConnect_1.default.listen(PORT, () => {
    return console.log(`App is listening at Port ${PORT}`);
});
//# sourceMappingURL=app.js.map