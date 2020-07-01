"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var SessionController_1 = __importDefault(require("../controller/SessionController"));
var sessionsRouter = express_1.Router();
var sessionController = new SessionController_1.default();
sessionsRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), sessionController.create);
exports.default = sessionsRouter;
