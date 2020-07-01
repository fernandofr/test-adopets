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
require("reflect-metadata");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var UpdateProductService_1 = __importDefault(require("./UpdateProductService"));
var CreateProductService_1 = __importDefault(require("./CreateProductService"));
var FakeProductsRepository_1 = __importDefault(require("../repositories/fakes/FakeProductsRepository"));
var fakeProductsRepository;
var productUpdateService;
describe('UpdateProduct', function () {
    beforeEach(function () {
        fakeProductsRepository = new FakeProductsRepository_1.default();
        productUpdateService = new UpdateProductService_1.default(fakeProductsRepository);
    });
    it('should be able to update the product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProduct, product, updatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProduct = new CreateProductService_1.default(fakeProductsRepository);
                    return [4 /*yield*/, createProduct.execute({
                            name: 'Golden Premier',
                            description: 'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
                            price: 120.0,
                            stock: 10,
                            category: 'dog food',
                        })];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, productUpdateService.execute(product.id, {
                            name: 'Golden Premier Top',
                            description: 'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
                            price: 120.0,
                            stock: 10,
                            category: 'dog food',
                        })];
                case 2:
                    updatedProduct = _a.sent();
                    expect(updatedProduct.name).toBe('Golden Premier Top');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to update the product with id invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(productUpdateService.execute('', {
                        name: 'Golden Premier Top',
                        description: 'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
                        price: 120.0,
                        stock: 10,
                        category: 'dog food',
                    })).rejects.toBeInstanceOf(AppError_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
