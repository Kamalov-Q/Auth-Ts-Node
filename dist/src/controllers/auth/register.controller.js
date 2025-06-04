"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const hash_1 = require("../../../utils/hash");
const users_model_1 = require("../../../models/users.model");
const generateToken_1 = require("../../../utils/generateToken");
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(422).json({ message: "All fields are required" });
            return;
        }
        const existingUser = await users_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        const newUser = await users_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
        return;
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ message: "All fields are required" });
            return;
        }
        const existingUser = await users_model_1.User.findOne({ email });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isPasswordMatch = await (0, hash_1.comparePassword)(password, existingUser.password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const accessToken = (0, generateToken_1.generateAccessToken)(existingUser);
        const refreshToken = (0, generateToken_1.generateRefreshToken)(existingUser);
        res.status(200).json({
            message: "User logged in successfully",
            user: existingUser,
            accessToken,
            refreshToken,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error : ${error}` });
        return;
    }
};
exports.loginUser = loginUser;
const getCurrentUser = async (req, res) => {
    try {
        const user = await users_model_1.User.findById(req.user.id);
        console.log(user, "user");
        res.status(200).json({ user, message: "Current User" });
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error : ${error}` });
    }
};
exports.getCurrentUser = getCurrentUser;
const getUsers = async (req, res) => {
    try {
        const users = await users_model_1.User.find({});
        res.status(200).json({ users, message: "Users", count: users.length });
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error : ${error}` });
    }
};
exports.getUsers = getUsers;
