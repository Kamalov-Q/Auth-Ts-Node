"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentificateUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var authentificateUser = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        var token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("Error while authenticating user: ".concat(error));
    }
};
exports.authentificateUser = authentificateUser;
