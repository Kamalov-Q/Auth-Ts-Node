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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.updateUserProfile = exports.getUsers = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
var users_model_1 = require("../../models/users.model");
var generateToken_1 = require("../../utils/generateToken");
var hash_1 = require("../../utils/hash");
var mongoose_1 = __importDefault(require("mongoose"));
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, existingUser, hashedPassword, newUser, _b, removedPassword, rest, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                if (!name_1 || !email || !password) {
                    res.status(422).json({ message: "All fields are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users_model_1.User.findOne({ email: email })];
            case 1:
                existingUser = _c.sent();
                if (existingUser) {
                    res.status(409).json({ message: "User already exists" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, hash_1.hashPassword)(password)];
            case 2:
                hashedPassword = _c.sent();
                return [4 /*yield*/, users_model_1.User.create({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                newUser = _c.sent();
                _b = newUser.toObject(), removedPassword = _b.password, rest = __rest(_b, ["password"]);
                res.status(201).json({
                    message: "User registered successfully",
                    user: rest,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                console.error(error_1);
                res.status(500).json({ message: "Internal Server Error: ".concat(error_1) });
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, isPasswordMatch, accessToken, refreshToken, _b, removedPassword, rest, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(422).json({ message: "Email and password are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users_model_1.User.findOne({ email: email })];
            case 1:
                existingUser = _c.sent();
                if (!existingUser) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, hash_1.comparePassword)(password, existingUser.password)];
            case 2:
                isPasswordMatch = _c.sent();
                if (!isPasswordMatch) {
                    res.status(401).json({ message: "Invalid email or password" });
                    return [2 /*return*/];
                }
                accessToken = (0, generateToken_1.generateAccessToken)(existingUser);
                refreshToken = (0, generateToken_1.generateRefreshToken)(existingUser);
                _b = existingUser.toObject(), removedPassword = _b.password, rest = __rest(_b, ["password"]);
                res.status(200).json({
                    message: "User logged in successfully",
                    user: rest,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                res.status(500).json({ message: "Internal Server Error: ".concat(error_2) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: "Unauthorized: User ID missing" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users_model_1.User.findById(req.user.id).select("-password")];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ user: user, message: "Current User" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(500).json({ message: "Internal Server Error: ".concat(error_3) });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUser = getCurrentUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_model_1.User.find().select("-password")];
            case 1:
                users = _a.sent();
                res.status(200).json({ users: users, message: "Users", count: users.length });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ message: "Internal Server Error: ".concat(error_4) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var updateUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_2, id, updatedUser, _a, password, rest, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                name_2 = req.body.name;
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id) || !id) {
                    res.status(422).json({ message: "Provide all required fields" });
                    return [2 /*return*/];
                }
                if (!name_2) {
                    res.status(422).json({ message: "Provide all required fields" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users_model_1.User.findByIdAndUpdate(id, { name: name_2 }, { new: true })];
            case 1:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                    return [2 /*return*/];
                }
                _a = updatedUser.toObject(), password = _a.password, rest = __rest(_a, ["password"]);
                res.status(200).json({ message: "Profile updated", user: rest });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(500).json({ message: "Internal Server Error: ".concat(error_5) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserProfile = updateUserProfile;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, name_3, password, userId, updFields, _b, user, updatedUser, _c, userPassword, rest, error_6;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, name_3 = _a.name, password = _a.password;
                userId = req.params.userId;
                if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !userId) {
                    res.status(422).json({ message: "Invalid User ID" });
                    return [2 /*return*/];
                }
                updFields = {};
                if (name_3)
                    updFields.name = name_3;
                if (email)
                    updFields.email = email;
                if (!password) return [3 /*break*/, 2];
                _b = updFields;
                return [4 /*yield*/, (0, hash_1.hashPassword)(password)];
            case 1:
                _b.password = _d.sent();
                _d.label = 2;
            case 2:
                if (Object.keys(updFields).length === 0) {
                    res.status(422).json({ message: "Provide at least one field to update" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, users_model_1.User.findById(userId)];
            case 3:
                user = _d.sent();
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                }
                return [4 /*yield*/, users_model_1.User.findByIdAndUpdate(userId, updFields, {
                        new: true,
                    })];
            case 4:
                updatedUser = _d.sent();
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                }
                _c = updatedUser.toObject(), userPassword = _c.password, rest = __rest(_c, ["password"]);
                res.status(200).json({ message: "User updated successfully", user: rest });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _d.sent();
                res.status(500).json({ message: "Internal Server Error: ".concat(error_6) });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
