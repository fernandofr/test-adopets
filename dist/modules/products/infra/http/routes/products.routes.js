"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
var productsRouter = express_1.Router();
var productsController = new ProductsController_1.default();
productsRouter.get('/', productsController.index);
productsRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        category: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        stock: celebrate_1.Joi.number().required(),
    },
    _a)), productsController.create);
productsRouter.put('/:id', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _b[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        category: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        stock: celebrate_1.Joi.number().required(),
    },
    _b)), productsController.update);
productsRouter.delete('/:id', celebrate_1.celebrate((_c = {},
    _c[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _c)), productsController.delete);
exports.default = productsRouter;
