"use strict";
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
var typeorm_1 = require("typeorm");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var Product_1 = __importDefault(require("../entities/Product"));
var ProductsRepository = /** @class */ (function () {
    function ProductsRepository() {
        this.ormRepository = typeorm_1.getRepository(Product_1.default);
    }
    ProductsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductsRepository.prototype.findAll = function (page, limit, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findAndCount({
                            skip: (page - 1) * limit,
                            take: limit,
                            where: params,
                        })];
                    case 1:
                        _a = _b.sent(), data = _a[0], count = _a[1];
                        return [2 /*return*/, { products: data, count: count }];
                }
            });
        });
    };
    ProductsRepository.prototype.create = function (_a) {
        var name = _a.name, description = _a.description, price = _a.price, stock = _a.stock, category = _a.category;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product = this.ormRepository.create({
                            name: name,
                            description: description,
                            price: price,
                            stock: stock,
                            category_id: category,
                        });
                        return [4 /*yield*/, this.ormRepository.save(product)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductsRepository.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var product, mergedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new AppError_1.default('Product not found!', 404);
                        }
                        mergedData = this.ormRepository.merge(product, data);
                        return [4 /*yield*/, this.ormRepository.save(mergedData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, mergedData];
                }
            });
        });
    };
    ProductsRepository.prototype.save = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ormRepository.save(product)];
            });
        });
    };
    ProductsRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.delete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductsRepository;
}());
exports.default = ProductsRepository;
