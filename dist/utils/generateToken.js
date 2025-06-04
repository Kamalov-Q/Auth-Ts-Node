"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var generateAccessToken = function (user) {
    try {
        var accessToken = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        return accessToken;
    }
    catch (error) {
        console.error("Error while generating access token: ".concat(error));
    }
};
exports.generateAccessToken = generateAccessToken;
var generateRefreshToken = function (user) {
    try {
        var refreshToken = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });
        return refreshToken;
    }
    catch (error) {
        console.error("Error while generating refresh token: ".concat(error));
    }
};
exports.generateRefreshToken = generateRefreshToken;
