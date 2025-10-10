"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioService = void 0;
// src/services/ApoioService.ts
const axios_1 = __importDefault(require("axios"));
const ApoioRepository_1 = require("../Repository/ApoioRepository");
const apoio_1 = require("../Model/apoio");
const API_URL = "https://api.abacatepay.com/v1";
const API_KEY = process.env.ABACATEPAY_API_KEY || "abc_dev_snktBFqSMmahNKNQBdCaUJyX";
class ApoioService {
    static async criarApoio(data) {
        //Cria um apoio com pix temporário
        const apoio = new apoio_1.Apoio();
        apoio.produtoId = data.produto;
        apoio.apoiadorId = data.apoiador;
        apoio.recompensaId = data.recompensa || undefined;
        apoio.valor = data.valor;
        apoio.status = "PENDING";
        apoio.pixId = "temp_" + Date.now();
        const apoioSalvo = await ApoioRepository_1.ApoioRepository.save(apoio);
        try {
            // Cria o PIX
            const response = await axios_1.default.post(`${API_URL}/pixQrCode/create`, {
                amount: Math.round(data.valor * 100),
                description: `Apoio ao produto ${data.produto}`,
                expiresIn: 3600,
                metadata: { apoioId: apoioSalvo.id },
            }, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            const pixData = response.data.data;
            // Atualiza apoio com o pixId real
            apoioSalvo.pixId = pixData.id;
            apoioSalvo.status = pixData.status;
            // Salva novamente com as informações do PIX
            const apoioAtualizado = await ApoioRepository_1.ApoioRepository.save(apoioSalvo);
            return { apoio: apoioAtualizado, pix: pixData };
        }
        catch (error) {
            // Se der erro na criação do PIX, deleta o apoio criado
            await ApoioRepository_1.ApoioRepository.remove(apoioSalvo);
            throw new Error(`Erro ao criar PIX: ${error.response?.data?.message || error.message}`);
        }
    }
    static async verificarStatus(apoioId) {
        const apoio = await ApoioRepository_1.ApoioRepository.findOneBy({ id: apoioId });
        if (!apoio || !apoio.pixId)
            throw new Error("Apoio não encontrado ou sem Pix vinculado");
        const response = await axios_1.default.get(`${API_URL}/pixQrCode/check`, {
            headers: { Authorization: `Bearer ${API_KEY}` },
            params: { id: apoio.pixId },
        });
        const pixStatus = response.data.data.status;
        apoio.status = pixStatus;
        await ApoioRepository_1.ApoioRepository.save(apoio);
        return apoio;
    }
}
exports.ApoioService = ApoioService;
