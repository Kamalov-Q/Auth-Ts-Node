"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Authentification and Authorization API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Local Server",
            },
            {
                url: "https://auth-ts-node.onrender.com/",
                description: "Production Server",
            },
        ],
    },
    apis: ["./src/utils/swagger.ts"], // paths to files with annotations
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
