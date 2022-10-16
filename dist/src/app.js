"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConnect_1 = __importDefault(require("./appConnect"));
const port = 3000;
appConnect_1.default.get('/', (req, res) => {
    res.send('Hello World!');
});
appConnect_1.default.listen(port, () => {
    return console.log(`App is listening at Port ${port}`);
});
//# sourceMappingURL=app.js.map