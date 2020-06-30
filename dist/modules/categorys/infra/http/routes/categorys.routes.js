"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var CategorysController_1 = __importDefault(require("../controller/CategorysController"));
var categorysRouter = express_1.Router();
var categorysController = new CategorysController_1.default();
categorysRouter.get('/', categorysController.index);
categorysRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        title: celebrate_1.Joi.string().required(),
    },
    _a)), categorysController.create);
exports.default = categorysRouter;
