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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const typeorm_1 = require("typeorm");
const categoria_1 = require("./categoria");
const pessoa_fisica_1 = require("./pessoa_fisica");
const pessoa_juridica_1 = require("./pessoa_juridica");
let Produto = class Produto {
};
exports.Produto = Produto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produto.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Produto.prototype, "valor_meta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Produto.prototype, "valor_arrecadado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_1.Categoria, { eager: false }),
    __metadata("design:type", categoria_1.Categoria)
], Produto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_fisica_1.PessoaFisica, { eager: true, nullable: true }),
    __metadata("design:type", pessoa_fisica_1.PessoaFisica)
], Produto.prototype, "criadorPessoaFisica", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_juridica_1.PessoaJuridica, { eager: true, nullable: true }),
    __metadata("design:type", pessoa_juridica_1.PessoaJuridica)
], Produto.prototype, "criadorPessoaJuridica", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "imagem_capa", void 0);
exports.Produto = Produto = __decorate([
    (0, typeorm_1.Entity)()
], Produto);
