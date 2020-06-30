"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var configLogger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.printf(function (info) { return "[" + info.timestamp + "] " + info.level + ": " + info.message; })),
    transports: [
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: __dirname + "/../logs/adopets.log",
        }),
        new winston_1.transports.Console({
            level: 'info',
        }),
    ],
});
exports.default = configLogger;
