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
exports.Apoio = void 0;
const typeorm_1 = require("typeorm");
const produto_1 = require("./produto");
const recompensa_1 = require("./recompensa");
const pessoa_fisica_1 = require("./pessoa_fisica");
const pessoa_juridica_1 = require("./pessoa_juridica");
let Apoio = class Apoio {
};
exports.Apoio = Apoio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Apoio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Apoio.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Apoio.prototype, "pixId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "PENDING" }),
    __metadata("design:type", String)
], Apoio.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Apoio.prototype, "data_apoio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Apoio.prototype, "apoiadorPessoaFisicaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Apoio.prototype, "apoiadorPessoaJuridicaId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Apoio.prototype, "produtoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_fisica_1.PessoaFisica, { eager: false, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "apoiadorPessoaFisicaId" }),
    __metadata("design:type", pessoa_fisica_1.PessoaFisica)
], Apoio.prototype, "apoiadorPessoaFisica", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoa_juridica_1.PessoaJuridica, { eager: false, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "apoiadorPessoaJuridicaId" }),
    __metadata("design:type", pessoa_juridica_1.PessoaJuridica)
], Apoio.prototype, "apoiadorPessoaJuridica", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_1.Produto, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "produtoId" }),
    __metadata("design:type", produto_1.Produto)
], Apoio.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recompensa_1.Recompensa, { eager: false, nullable: true }),
    __metadata("design:type", recompensa_1.Recompensa)
], Apoio.prototype, "recompensa", void 0);
exports.Apoio = Apoio = __decorate([
    (0, typeorm_1.Entity)()
], Apoio);
