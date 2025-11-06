"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioService = void 0;
// src/services/ApoioService.ts
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const ApoioRepository_1 = require("../Repository/ApoioRepository");
const apoio_1 = require("../Model/apoio");
const ABACATE_PAY_BASE_URL = "https://api.abacatepay.com/v1";
const ABACATE_PAY_API_KEY = process.env.ABACATE_PAY_API_KEY;
class ApoioService {
    static async criarApoio(data) {
        const apoio = new apoio_1.Apoio();
        apoio.produtoId = data.produto;
        apoio.apoiadorId = data.apoiador;
        apoio.valor = data.valor;
        apoio.status = "PENDING";
        apoio.pixId = "temp_" + Date.now();
        const apoioSalvo = await ApoioRepository_1.ApoioRepository.save(apoio);
        try {
            console.log("🔗 Criando QR Code PIX no Abacate Pay...");
            const createQRCodeResponse = await axios_1.default.post(`${ABACATE_PAY_BASE_URL}/pixQrCode/create`, {
                amount: data.valor,
                description: `Apoio ao produto ${data.produto}`,
                expires_in: 3600,
                merchant_city: "São Paulo",
                merchant_name: "Crowdfunding App",
            }, {
                headers: {
                    "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            });
            console.log("✅ Resposta da API:", createQRCodeResponse.data);
            const qrCodeData = createQRCodeResponse.data;
            // ✅ ATUALIZAÇÃO IMPORTANTE: Salva o ID REAL do Abacate Pay
            apoioSalvo.pixId = qrCodeData.data.id; // ID real do Abacate Pay
            apoioSalvo.status = "CREATED";
            const apoioAtualizado = await ApoioRepository_1.ApoioRepository.save(apoioSalvo);
            return {
                apoio: apoioAtualizado,
                pix: {
                    id: qrCodeData.data.id,
                    valor: data.valor,
                    brCode: qrCodeData.data.brCode,
                    brCodeBase64: qrCodeData.data.brCodeBase64,
                    expires_at: qrCodeData.data.expiresAt,
                },
            };
        }
        catch (error) {
            console.error("❌ Erro ao criar QR Code PIX:", error);
            await ApoioRepository_1.ApoioRepository.remove(apoioSalvo);
            throw new Error(`Erro ao criar PIX: ${error.response?.data?.message || error.message}`);
        }
    }
    static async simularPagamento(apoioId) {
        const apoio = await ApoioRepository_1.ApoioRepository.findOneBy({ id: apoioId });
        if (!apoio || !apoio.pixId) {
            throw new Error("Apoio não encontrado ou sem Pix vinculado");
        }
        // ✅ VERIFICA se não é um ID temporário
        if (apoio.pixId.startsWith('temp_')) {
            throw new Error("QR Code PIX ainda não foi gerado completamente");
        }
        try {
            console.log("🔗 Simulando pagamento no Abacate Pay...");
            console.log("📡 QR Code ID:", apoio.pixId);
            const simulateResponse = await axios_1.default.post(`${ABACATE_PAY_BASE_URL}/pixQrCode/simulate-payment?id=${apoio.pixId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            });
            const simulationResult = simulateResponse.data;
            console.log("✅ Resposta da simulação:", simulationResult);
            // Atualiza status do apoio
            if (simulationResult.data?.status === "PAID") {
                apoio.status = "PAID";
                await ApoioRepository_1.ApoioRepository.save(apoio);
            }
            return {
                apoio,
                simulation: simulationResult,
            };
        }
        catch (error) {
            console.error("❌ Erro ao simular pagamento:", error);
            throw new Error(`Erro ao simular pagamento: ${error.response?.data?.message || error.message}`);
        }
    }
    static async verificarStatus(apoioId) {
        const apoio = await ApoioRepository_1.ApoioRepository.findOneBy({ id: apoioId });
        if (!apoio || !apoio.pixId) {
            throw new Error("Apoio não encontrado ou sem Pix vinculado");
        }
        // ✅ VERIFICA se não é um ID temporário
        if (apoio.pixId.startsWith('temp_')) {
            return {
                apoio,
                pixStatus: "PENDING",
                message: "Aguardando geração do QR Code"
            };
        }
        try {
            console.log("🔗 Verificando status no Abacate Pay...");
            // ✅ ENDPOINT CORRETO para consultar status
            const statusResponse = await axios_1.default.get(`${ABACATE_PAY_BASE_URL}/pixQrCode/${apoio.pixId}`, {
                headers: {
                    "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
                },
                timeout: 10000,
            });
            const pixStatus = statusResponse.data;
            console.log("✅ Status retornado:", pixStatus);
            // Atualiza status do apoio
            if (pixStatus.data?.status) {
                apoio.status = pixStatus.data.status;
                await ApoioRepository_1.ApoioRepository.save(apoio);
            }
            return {
                apoio,
                pixStatus: pixStatus.data?.status || "UNKNOWN",
                pixData: pixStatus,
            };
        }
        catch (error) {
            console.error("❌ Erro ao verificar status:", error);
            // Se der 404, pode ser que o endpoint seja diferente
            if (error.response?.status === 404) {
                // Tenta um endpoint alternativo
                return await this.verificarStatusAlternativo(apoio);
            }
            throw new Error(`Erro ao verificar status: ${error.response?.data?.message || error.message}`);
        }
    }
    // Método alternativo para verificar status
    static async verificarStatusAlternativo(apoio) {
        try {
            console.log("🔄 Tentando endpoint alternativo para verificar status...");
            // Algumas APIs usam query parameters em vez de path parameters
            const statusResponse = await axios_1.default.get(`${ABACATE_PAY_BASE_URL}/pixQrCode`, {
                headers: {
                    "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
                },
                params: {
                    id: apoio.pixId
                },
                timeout: 10000,
            });
            const pixStatus = statusResponse.data;
            if (pixStatus.data?.status) {
                apoio.status = pixStatus.data.status;
                await ApoioRepository_1.ApoioRepository.save(apoio);
            }
            return {
                apoio,
                pixStatus: pixStatus.data?.status || "UNKNOWN",
                pixData: pixStatus,
            };
        }
        catch (error) {
            console.error("❌ Endpoint alternativo também falhou:", error);
            // Retorna status baseado no que temos no banco
            return {
                apoio,
                pixStatus: apoio.status,
                message: "Não foi possível verificar status com a API"
            };
        }
    }
    static async processarWebhook(webhookData) {
        try {
            const { qrcode_id, status, amount } = webhookData;
            console.log("🔗 Processando webhook do Abacate Pay:", { qrcode_id, status });
            // Encontra o apoio pelo ID do PIX
            const apoio = await ApoioRepository_1.ApoioRepository.findOneBy({ pixId: qrcode_id });
            if (apoio) {
                apoio.status = status;
                await ApoioRepository_1.ApoioRepository.save(apoio);
                console.log("✅ Webhook processado - Status atualizado para:", status);
                return { success: true, apoio };
            }
            return { success: false, error: "Apoio não encontrado" };
        }
        catch (error) {
            console.error("❌ Erro ao processar webhook:", error);
            throw error;
        }
    }
}
exports.ApoioService = ApoioService;
