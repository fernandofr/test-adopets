"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var celebrate_1 = require("celebrate");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
require("@shared/container");
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
var logger_1 = __importDefault(require("./middleware/logger"));
var routes_1 = __importDefault(require("./routes"));
typeorm_1.default();
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        var error = {
            status: 'error',
            message: err.message,
        };
        logger_1.default.error(error);
        return response.status(err.statusCode).json(error);
    }
    logger_1.default.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
exports.default = app;
