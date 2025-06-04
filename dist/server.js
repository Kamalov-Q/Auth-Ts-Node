"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var database_config_1 = require("./config/database.config");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_config_1 = __importDefault(require("./config/swagger.config"));
(0, dotenv_1.config)();
var PORT = process.env.PORT;
(0, database_config_1.connectDB)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.get("/", function (req, res) {
    res.send("Server is running");
});
app.get("/test", function (req, res) {
    res.send("Server is running Testing");
});
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
    console.log("Swagger docs available on port http://localhost:".concat(PORT, "/api-docs"));
});
