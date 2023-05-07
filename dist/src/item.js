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
exports.getAllItems = exports.deleteItem = exports.updateItem = exports.getItemById = exports.createItem = void 0;
const db_1 = __importDefault(require("./db"));
const knex_1 = __importDefault(require("knex"));
function createItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const [id] = yield (0, db_1.default)('items').insert(item);
        return Object.assign({ id }, item);
    });
}
exports.createItem = createItem;
function getItemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [item] = yield (0, db_1.default)('items').where({ id });
        return item;
    });
}
exports.getItemById = getItemById;
function updateItem(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)('items').where({ id }).update(updates);
        return yield getItemById(id);
    });
}
exports.updateItem = updateItem;
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const numDeleted = yield (0, knex_1.default)('items').where({ id }).delete();
        return numDeleted;
    });
}
exports.deleteItem = deleteItem;
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, db_1.default)('items').select('*');
    });
}
exports.getAllItems = getAllItems;
