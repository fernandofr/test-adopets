"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var ReadProductService_1 = __importDefault(require("@modules/products/services/ReadProductService"));
var CreateProductService_1 = __importDefault(require("@modules/products/services/CreateProductService"));
var UpdateProductService_1 = __importDefault(require("@modules/products/services/UpdateProductService"));
var DeleteProductService_1 = __importDefault(require("@modules/products/services/DeleteProductService"));
var CreateCategoryService_1 = __importDefault(require("@modules/categorys/services/CreateCategoryService"));
var FindCategoryService_1 = __importDefault(require("@modules/categorys/services/FindCategoryService"));
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, _d, name, description, category, where, findCategory, category_id, readProduct, listProducts;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = request.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        _d = request.query, name = _d.name, description = _d.description, category = _d.category;
                        where = {};
                        if (name) {
                            where = { name: name };
                        }
                        if (description) {
                            where = __assign(__assign({}, where), { description: description });
                        }
                        if (!category) return [3 /*break*/, 2];
                        findCategory = tsyringe_1.container.resolve(FindCategoryService_1.default);
                        return [4 /*yield*/, findCategory.execute(category)];
                    case 1:
                        category_id = _e.sent();
                        where = __assign(__assign({}, where), { category_id: category_id });
                        _e.label = 2;
                    case 2:
                        readProduct = tsyringe_1.container.resolve(ReadProductService_1.default);
                        return [4 /*yield*/, readProduct.execute(page, limit, where)];
                    case 3:
                        listProducts = _e.sent();
                        response.header('X-Total-Count', listProducts.count.toString());
                        return [2 /*return*/, response.json(listProducts.products)];
                }
            });
        });
    };
    ProductsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, category, price, stock, createCategory, createProduct, findOrCreateCategory, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, category = _a.category, price = _a.price, stock = _a.stock;
                        createCategory = tsyringe_1.container.resolve(CreateCategoryService_1.default);
                        createProduct = tsyringe_1.container.resolve(CreateProductService_1.default);
                        return [4 /*yield*/, createCategory.execute({
                                title: category,
                            })];
                    case 1:
                        findOrCreateCategory = _b.sent();
                        return [4 /*yield*/, createProduct.execute({
                                name: name,
                                description: description,
                                price: price,
                                stock: stock,
                                category: findOrCreateCategory.id,
                            })];
                    case 2:
                        product = _b.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    ProductsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, description, price, stock, category, createCategory, updateService, findOrCreateCategory, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        _a = request.body, name = _a.name, description = _a.description, price = _a.price, stock = _a.stock, category = _a.category;
                        createCategory = tsyringe_1.container.resolve(CreateCategoryService_1.default);
                        updateService = tsyringe_1.container.resolve(UpdateProductService_1.default);
                        return [4 /*yield*/, createCategory.execute({
                                title: category,
                            })];
                    case 1:
                        findOrCreateCategory = _b.sent();
                        return [4 /*yield*/, updateService.execute(id, {
                                name: name,
                                description: description,
                                price: price,
                                stock: stock,
                                category: findOrCreateCategory.id,
                            })];
                    case 2:
                        product = _b.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    ProductsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteProduct;
            return __generator(this, function (_a) {
                id = request.params.id;
                deleteProduct = tsyringe_1.container.resolve(DeleteProductService_1.default);
                deleteProduct.execute(id);
                return [2 /*return*/, response.status(204).send()];
            });
        });
    };
    return ProductsController;
}());
exports.default = ProductsController;
