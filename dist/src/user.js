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
exports.getUserByUsername = exports.createUser = void 0;
const db_1 = __importDefault(require("./db"));
const auth_1 = require("./auth");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, auth_1.hashPassword)(user.password);
        const [createdUser] = yield (0, db_1.default)('users')
            .insert(Object.assign(Object.assign({}, user), { password: hashedPassword }))
            .returning('*');
        return createdUser;
    });
}
exports.createUser = createUser;
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, db_1.default)('users').where({ username }).first();
    });
}
exports.getUserByUsername = getUserByUsername;
