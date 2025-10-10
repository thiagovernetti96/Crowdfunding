// src/services/ApoioService.ts
import axios from "axios";
import { ApoioRepository } from "../Repository/ApoioRepository";
import { Apoio } from "../Model/apoio";

const API_URL = "https://api.abacatepay.com/v1";
const API_KEY = process.env.ABACATEPAY_API_KEY || "abc_dev_snktBFqSMmahNKNQBdCaUJyX";

export class ApoioService {
 static async criarApoio(data: {
    produto: number;
    apoiador: number;
    recompensa?: number;
    valor: number;
  }) {
    //Cria um apoio com pix temporário
    const apoio = new Apoio();
    apoio.produtoId = data.produto;
    apoio.apoiadorId = data.apoiador
    apoio.recompensaId = data.recompensa || undefined;
    apoio.valor = data.valor;
    apoio.status = "PENDING";
    apoio.pixId = "temp_" + Date.now();

    const apoioSalvo = await ApoioRepository.save(apoio);

    try {
      // Cria o PIX
      const response = await axios.post(
        `${API_URL}/pixQrCode/create`,
        {
          amount: Math.round(data.valor * 100),
          description: `Apoio ao produto ${data.produto}`,
          expiresIn: 3600,
          metadata: { apoioId: apoioSalvo.id },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const pixData = response.data.data;

      // Atualiza apoio com o pixId real
      apoioSalvo.pixId = pixData.id;
      apoioSalvo.status = pixData.status;

      // Salva novamente com as informações do PIX
      const apoioAtualizado = await ApoioRepository.save(apoioSalvo);

      return { apoio: apoioAtualizado, pix: pixData };

    } catch (error:any) {
      // Se der erro na criação do PIX, deleta o apoio criado
      await ApoioRepository.remove(apoioSalvo);
      throw new Error(`Erro ao criar PIX: ${error.response?.data?.message || error.message}`);
    }
  }

  static async verificarStatus(apoioId: number) {
    const apoio = await ApoioRepository.findOneBy({ id: apoioId });
    if (!apoio || !apoio.pixId) throw new Error("Apoio não encontrado ou sem Pix vinculado");

    const response = await axios.get(`${API_URL}/pixQrCode/check`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { id: apoio.pixId },
    });

    const pixStatus = response.data.data.status;
    apoio.status = pixStatus;
    await ApoioRepository.save(apoio);

    return apoio;
  }
}
