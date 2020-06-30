"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_route_1 = __importDefault(require("@modules/users/infra/http/routes/users.route"));
var session_route_1 = __importDefault(require("@modules/users/infra/http/routes/session.route"));
var categorys_routes_1 = __importDefault(require("@modules/categorys/infra/http/routes/categorys.routes"));
var products_routes_1 = __importDefault(require("@modules/products/infra/http/routes/products.routes"));
var ensureAuthenticated_1 = __importDefault(require("../middleware/ensureAuthenticated"));
var appLogger_1 = __importDefault(require("../middleware/appLogger"));
var routes = express_1.Router();
routes.use('/users', appLogger_1.default, users_route_1.default);
routes.use('/session', appLogger_1.default, session_route_1.default);
routes.use('/categorys', ensureAuthenticated_1.default, appLogger_1.default, categorys_routes_1.default);
routes.use('/products', ensureAuthenticated_1.default, appLogger_1.default, products_routes_1.default);
exports.default = routes;
