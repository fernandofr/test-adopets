"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
function AppLogger(request, response, next) {
    var log = {
        method: request.method,
        url: request.originalUrl,
        user: request.user ? request.user.id : 'route without authentication',
        body: request.body,
        params: request.params,
    };
    logger_1.default.info(JSON.stringify(log));
    return next();
}
exports.default = AppLogger;
