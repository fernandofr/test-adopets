"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
var UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
var CategorysRepository_1 = __importDefault(require("@modules/categorys/infra/typeorm/repositories/CategorysRepository"));
var ProductsRepository_1 = __importDefault(require("@modules/products/infra/typeorm/repositories/ProductsRepository"));
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('CategorysRepository', CategorysRepository_1.default);
tsyringe_1.container.registerSingleton('ProductsRepository', ProductsRepository_1.default);
