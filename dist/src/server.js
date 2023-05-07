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
const express_1 = __importDefault(require("express"));
const item_1 = require("./item");
const user_1 = require("./user");
const auth_1 = require("./auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const secret = 'mysecret';
const app = (0, express_1.default)();
app.use(express_1.default.json());
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).send('Invalid authorization header');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret || '');
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send('Invalid token');
    }
};
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const existingUser = yield (0, user_1.getUserByUsername)(user.username);
    if (existingUser) {
        res.status(409).send('Username already exists');
        return;
    }
    const createdUser = yield (0, user_1.createUser)(user);
    const token = (0, auth_1.generateToken)(createdUser);
    res.json({ user: createdUser, token });
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield (0, user_1.getUserByUsername)(username);
    if (!user) {
        res.status(401).send('Invalid username or password');
        return;
    }
    const passwordMatch = yield (0, auth_1.comparePassword)(password, user.password);
    if (!passwordMatch) {
        res.status(401).send('Invalid username or password');
        return;
    }
    const token = (0, auth_1.generateToken)(user);
    res.json({ user, token });
}));
app.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implement logout logic
    res.send('Logout successful');
}));
app.get('/items', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, item_1.getAllItems)();
    res.json(items);
}));
app.get('/items/:id', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const item = yield (0, item_1.getItemById)(id);
    if (!item) {
        res.status(404).send(`Item with ID ${id} not found`);
        return;
    }
    res.json(item);
}));
app.post('/items', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = req.body;
    const newItem = yield (0, item_1.createItem)(item);
    res.json(newItem);
}));
app.put('/items/:id', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const item = req.body;
    const updatedItem = yield (0, item_1.updateItem)(id, item);
    if (!updatedItem) {
        res.status(404).send(`Item with ID ${id} not found`);
        return;
    }
    res.json(updatedItem);
}));
app.delete('/items/:id', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const deletedItem = yield (0, item_1.deleteItem)(id);
    if (!deletedItem) {
        res.status(404).send('Item with ID ${id} not found');
        return;
    }
    res.json(deletedItem);
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port ${port}');
});
// Error handling middleware
