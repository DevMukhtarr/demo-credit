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
exports.inspector = exports.db = void 0;
require('dotenv/config');
const knex_1 = __importDefault(require("knex"));
const knex_schema_inspector_1 = __importDefault(require("knex-schema-inspector"));
const environment = process.env.ENVIRONMENT || 'development';
const config = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            database: 'democredit',
            user: 'root',
            password: 'admin',
        },
        migrations: {
            // tableName: path.resolve(__dirname, 'src', 'database', 'migrations')
            tableName: 'migrations',
            directory: "./migrations"
        },
        seeds: { directory: "./seeds" },
        useNullAsDefault: true
    },
    production: {
        client: 'mysql',
        connection: {
            host: process.env.HOST,
            port: 3306,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
        },
        migrations: {
            // tableName: path.resolve(__dirname, 'src', 'database', 'migrations')
            tableName: 'migrations',
            directory: "./migrations"
        },
        seeds: { directory: "./seeds" },
        useNullAsDefault: true
    }
};
exports.db = (0, knex_1.default)(config[environment]);
exports.inspector = (0, knex_schema_inspector_1.default)(exports.db);
const hasTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.db.schema.hasTable('users').then((created) => {
        if (created == false) {
            exports.db.schema.createTable('users', (table) => {
                table.increments(); // integer id
                table.string('firstname');
                table.string('lastname');
                table.string('username');
                table.string('email');
                table.string('password');
                table.integer('demowallet').defaultTo(0);
            }).then(() => {
                console.log('users table created');
            }).catch(() => {
                console.log("an error occurred");
            });
            exports.db.schema.createTable('transaction_history', (table) => {
                table.increments(); // integer id
                table.string('username');
                table.string('transaction_reference');
                table.integer('credit');
                table.integer('debit');
                table.integer('balance');
            }).then(() => {
                console.log('transaction history table created');
            }).catch(() => {
                console.log("an error occurred");
            });
        }
    });
});
hasTable();
exports.db.raw("SELECT VERSION()").then((version) => console.log((version[0][0]))).catch((err) => { console.log(err); throw err; });
(0, exports.db)('users');
//# sourceMappingURL=knexfile.js.map