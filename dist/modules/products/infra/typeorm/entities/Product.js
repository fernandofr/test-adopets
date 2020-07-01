"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Category_1 = __importDefault(require("@modules/categorys/infra/typeorm/entities/Category"));
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column('integer'),
        __metadata("design:type", Number)
    ], Product.prototype, "stock", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Category_1.default; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'category_id' }),
        __metadata("design:type", Category_1.default)
    ], Product.prototype, "category", void 0);
    __decorate([
        typeorm_1.Column({ select: false }),
        __metadata("design:type", String)
    ], Product.prototype, "category_id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Product.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ select: false }),
        __metadata("design:type", Date)
    ], Product.prototype, "updated_at", void 0);
    Product = __decorate([
        typeorm_1.Entity('products')
    ], Product);
    return Product;
}());
exports.default = Product;
