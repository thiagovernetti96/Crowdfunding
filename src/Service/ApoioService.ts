
import axios from "axios";
import 'dotenv/config';
import { ApoioRepository } from "../Repository/ApoioRepository";
import { Apoio } from "../Model/apoio";

const ABACATE_PAY_BASE_URL = "https://api.abacatepay.com/v1";
const ABACATE_PAY_API_KEY = process.env.ABACATE_PAY_API_KEY!;

export class ApoioService {
  
  static async criarApoio(data: { produto: number; apoiador: number; valor: number }) {
    const apoio = new Apoio();
    apoio.produtoId = data.produto;
    apoio.apoiadorId = data.apoiador;
    apoio.valor = data.valor;
    apoio.status = "PENDING";
    apoio.pixId = "temp_" + Date.now();

    const apoioSalvo = await ApoioRepository.save(apoio);

    try {
      console.log("🔗 Criando QR Code PIX no Abacate Pay...");
      
      const createQRCodeResponse = await axios.post(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/create`,
        {
          amount: data.valor,
          description: `Apoio ao produto ${data.produto}`,
          expiresIn: 3600,
          merchant_city: "São Paulo",
          merchant_name: "Crowdfunding App",
        },
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );

      console.log("✅ Resposta da API:", createQRCodeResponse.data);

      const qrCodeData = createQRCodeResponse.data;

      
      apoioSalvo.pixId = qrCodeData.id || qrCodeData.data?.id;
      apoioSalvo.status = qrCodeData.status || "CREATED";
      const apoioAtualizado = await ApoioRepository.save(apoioSalvo);

      return {
        apoio: apoioAtualizado,
        pix: {
          id: qrCodeData.id || qrCodeData.data?.id,
          valor: data.valor,
          brCode: qrCodeData.brCode || qrCodeData.data?.brCode,
          brCodeBase64: qrCodeData.brCodeBase64 || qrCodeData.data?.brCodeBase64,
          expires_at: qrCodeData.expiresAt || qrCodeData.data?.expiresAt,
          raw: qrCodeData 
        },
      };
    } catch (error: any) {
      console.error("❌ Erro ao criar QR Code PIX:", error.response?.data || error.message);
      await ApoioRepository.remove(apoioSalvo);
      throw new Error(`Erro ao criar PIX: ${error.response?.data?.message || error.message}`);
    }
  }

  static async simularPagamento(apoioId: number) {
    const apoio = await ApoioRepository.findOneBy({ id: apoioId });
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
      
      //  ENDPOINT CORRETO PARA SIMULAÇÃO 
      const simulateResponse = await axios.post(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/simulate`,
        {
          id: apoio.pixId
        },
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const simulationResult = simulateResponse.data;
      
      console.log("✅ Resposta da simulação:", simulationResult);

      // Atualiza status do apoio
      if (simulationResult.data?.status === "PAID") {
        apoio.status = "PAID";
        await ApoioRepository.save(apoio);
      }

      return {
        apoio,
        simulation: simulationResult,
      };
    } catch (error: any) {
      console.error("❌ Erro ao simular pagamento:", error.response?.data || error.message);
      
      // Fallback: marca como pago localmente se a API falhar
      if (process.env.NODE_ENV !== 'production') {
        console.log("⚠️ Modo desenvolvimento: marcando como PAID localmente");
        apoio.status = "PAID";
        await ApoioRepository.save(apoio);
        
        return {
          apoio,
          simulation: { data: { status: "PAID", message: "Simulado localmente" } },
          _devMode: true
        };
      }
      
      throw new Error(`Erro ao simular pagamento: ${error.response?.data?.message || error.message}`);
    }
  }

  static async verificarStatus(apoioId: number) {
    const apoio = await ApoioRepository.findOneBy({ id: apoioId });
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
      console.log("📡 QR Code ID:", apoio.pixId);
      
      // ENDPOINT CORRETO: /pixQrCode/check
      const statusResponse = await axios.post(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/check`,
        {
          id: apoio.pixId  // Envia o ID no body
        },
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const pixStatus = statusResponse.data;
      console.log("✅ Status retornado:", pixStatus);

      // Atualiza status do apoio
      if (pixStatus.data?.status) {
        const novoStatus = pixStatus.data.status.toUpperCase();
        if (novoStatus !== apoio.status) {
          apoio.status = novoStatus;
          await ApoioRepository.save(apoio);
          console.log("🔄 Status atualizado no banco:", novoStatus);
        }
      }

      return {
        apoio,
        pixStatus: pixStatus.data?.status || "UNKNOWN",
        pixData: pixStatus,
        lastChecked: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("❌ Erro ao verificar status:", error.response?.data || error.message);
      
      // Se der 404, tenta endpoint antigo como fallback
      if (error.response?.status === 404) {
        console.log("🔄 Tentando endpoint alternativo...");
        return await this.verificarStatusAlternativo(apoio);
      }
      
      // Em desenvolvimento, retorna mock
      if (process.env.NODE_ENV !== 'production') {
        console.log("⚠️ Modo desenvolvimento: retornando status mock");
        return {
          apoio,
          pixStatus: apoio.status || "PENDING",
          pixData: { data: { status: apoio.status, message: "Mock para desenvolvimento" } },
          _devMode: true
        };
      }
      
      throw new Error(`Erro ao verificar status: ${error.response?.data?.message || error.message}`);
    }
  }

  // Método alternativo para verificar status (fallback)
  private static async verificarStatusAlternativo(apoio: Apoio) {
    try {
      console.log("🔄 Tentando endpoint alternativo para verificar status...");
      
      // Tenta o endpoint antigo como fallback
      const statusResponse = await axios.get(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/${apoio.pixId}`,
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
          },
          timeout: 10000,
        }
      );

      const pixStatus = statusResponse.data;
      console.log("✅ Status via alternativa:", pixStatus);

      if (pixStatus.data?.status) {
        const novoStatus = pixStatus.data.status.toUpperCase();
        if (novoStatus !== apoio.status) {
          apoio.status = novoStatus;
          await ApoioRepository.save(apoio);
        }
      }

      return {
        apoio,
        pixStatus: pixStatus.data?.status || "UNKNOWN",
        pixData: pixStatus,
        source: "alternativo"
      };
    } catch (error) {
      console.error("❌ Endpoint alternativo também falhou:", error);
      // Retorna status baseado no que temos no banco
      return {
        apoio,
        pixStatus: apoio.status,
        message: "Não foi possível verificar status com a API",
        source: "database"
      };
    }
  }

  static async processarWebhook(webhookData: any) {
    try {
      console.log("🔗 Processando webhook do Abacate Pay:", webhookData);
      
      // Extrai dados do webhook (formato pode variar)
      const qrcode_id = webhookData.qrcode_id || webhookData.data?.id || webhookData.id;
      const status = (webhookData.status || webhookData.data?.status || "UNKNOWN").toUpperCase();
      
      console.log("📊 Dados extraídos:", { qrcode_id, status });
      
      if (!qrcode_id) {
        throw new Error("ID do QR Code não encontrado no webhook");
      }
      
      // Encontra o apoio pelo ID do PIX
      const apoio = await ApoioRepository.findOneBy({ pixId: qrcode_id });
      
      if (apoio) {
        const statusAntigo = apoio.status;
        apoio.status = status;
        await ApoioRepository.save(apoio);
        
        console.log(`✅ Webhook processado - Status atualizado de ${statusAntigo} para ${status}`);
        return { 
          success: true, 
          apoio,
          changes: { from: statusAntigo, to: status }
        };
      }
      
      console.warn("⚠️ Apoio não encontrado para o QR Code ID:", qrcode_id);
      return { success: false, error: "Apoio não encontrado" };
    } catch (error: any) {
      console.error("❌ Erro ao processar webhook:", error);
      throw error;
    }
  }

  //  Método de diagnóstico
  static async testarConexaoAbacatePay() {
    try {
      console.log("🧪 Testando conexão com Abacate Pay...");
      console.log("🔑 API Key:", ABACATE_PAY_API_KEY ? `${ABACATE_PAY_API_KEY.substring(0, 15)}...` : "NÃO CONFIGURADA");
      
      // Testa criação
      const criarResponse = await axios.post(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/create`,
        {
          amount: 1.00,
          description: "Teste de conexão",
          expiresIn: 300, // 5 minutos
        },
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );
      
      const pixId = criarResponse.data.id || criarResponse.data.data?.id;
      console.log("✅ PIX criado. ID:", pixId);
      
      // Aguarda 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Testa verificação
      const verificarResponse = await axios.post(
        `${ABACATE_PAY_BASE_URL}/pixQrCode/check`,
        { id: pixId },
        {
          headers: {
            "Authorization": `Bearer ${ABACATE_PAY_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      
      return {
        success: true,
        criacao: criarResponse.data,
        verificacao: verificarResponse.data,
        message: "API Abacate Pay funcionando corretamente!"
      };
      
    } catch (error: any) {
      console.error("❌ Teste falhou:", error.response?.data || error.message);
      
      return {
        success: false,
        error: error.message,
        response: error.response?.data,
        apiKeyConfigured: !!ABACATE_PAY_API_KEY,
        apiKeyPreview: ABACATE_PAY_API_KEY ? `${ABACATE_PAY_API_KEY.substring(0, 10)}...` : null
      };
    }
  }
}