import { Request,Response } from "express";
import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { RecompensaService } from "../../Service/RecompensaService";
import { RecompensaController } from "../../Controller/RecompensaController";

const mockRecompensaService = {
  inserir: jest.fn(),
  listar: jest.fn(),
  buscarporId: jest.fn(),
  buscarporNome: jest.fn(),
  atualizar: jest.fn(),
  deletar: jest.fn()
};

interface MockError {
  id: number;
  msg: string;
}

const mockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
};
const mockRequest = (body?: any, params?: any) => {
  return {
    body,
    params
  } as Request;
};

describe('RecompensaController', () => {
  let recompensaController: RecompensaController;
  let recompensaService: jest.Mocked<RecompensaService>;
  let res: Response;
  beforeEach(() => {
    recompensaService = mockRecompensaService as unknown as jest.Mocked<RecompensaService>;
    recompensaController = new RecompensaController(recompensaService);
    res = mockResponse();
  });
  describe('inserir', () => {
    it('deve inserir recompensa com sucesso e retornar status 201', async () => {
      const req = mockRequest({ nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 });
      const recompensaMock = { id: 1, ...req.body };
      recompensaService.inserir.mockResolvedValue(recompensaMock);
      await recompensaController.inserir(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(recompensaMock);
    });
    it('deve retornar erro 400 quando service lançar exceção', async () => {
          const req = mockRequest({ nome: '' });
          const erroMock: MockError = { id: 400, msg: 'O nome da recompensa é obrigatório' };
          recompensaService.inserir.mockRejectedValue(erroMock);
          await recompensaController.inserir(req, res);
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: 'O nome da recompensa é obrigatório' });
        });
  });
  describe('listar', () => {
    it('deve listar recompensas com sucesso e retornar status 200', async () => {
      const req = mockRequest();
      const recompensasMock = [
        { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 },
      ];
      recompensaService.listar.mockResolvedValueOnce(recompensasMock);
      await recompensaController.listar(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(recompensasMock);
    });
    it('deve tratar erro ao listar recompensas e retornar status 400', async () => {
      const req = mockRequest();
      const errorMock: MockError = { id: 1, msg: 'Erro ao listar recompensas' };
      recompensaService.listar.mockRejectedValue(errorMock);
      await recompensaController.listar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao listar recompensas" });
    });
  });

  describe('buscarporId', () => {
    it('deve buscar recompensa por id com sucesso e retornar status 201', async () => {
      const req = mockRequest(undefined, { id: '1' });
      const recompensaMock = { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 };
      recompensaService.buscarporId.mockResolvedValue(recompensaMock);
      await recompensaController.buscarporId(req, res);
      expect(recompensaService.buscarporId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(recompensaMock);
    });
    it('deve retornar erro ao tentar deletar recompensa inexistente', async () => {
         const req = mockRequest({}, { id: '999' });
         const erroMock: MockError = { id: 404, msg: 'Recompensa não encontrada' };
         recompensaService.deletar.mockRejectedValue(erroMock);
         await recompensaController.deletar(req, res);
         expect(res.status).toHaveBeenCalledWith(404);
         expect(res.json).toHaveBeenCalledWith({ message: 'Recompensa não encontrada' });
       });
  });

  describe('buscarporNome', () => {
    it('deve buscar recompensa por nome com sucesso e retornar status 201', async () => {
      const req = mockRequest({}, { nome: 'Recompensa X' });
      const recompensaMock = { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 };
      recompensaService.buscarporNome.mockResolvedValue(recompensaMock);
      await recompensaController.buscarporNome(req, res);
      expect(recompensaService.buscarporNome).toHaveBeenCalledWith('Recompensa X');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(recompensaMock);
    });
      it('deve retornar erro quando recompensa não encontrada por nome', async () => {
          const req = mockRequest({}, { nome: 'Inexistente' });
          const erroMock: MockError = { id: 404, msg: 'Recompensa não encontrada' };
          recompensaService.buscarporNome.mockRejectedValue(erroMock);
          await recompensaController.buscarporNome(req, res);
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: 404 });
        });
  });

  describe('atualizar', () => {
    it('deve atualizar recompensa com sucesso e retornar status 200', async () => {
      const req = mockRequest({ nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 }, { id: '1' } );
      const recompensaAtualizadaMock = { id: 1, nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 };
      recompensaService.atualizar.mockResolvedValue(recompensaAtualizadaMock);
      await recompensaController.atualizar(req, res);
      expect(recompensaService.atualizar).toHaveBeenCalledWith(1, { nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(recompensaAtualizadaMock);
    });
  });

  describe('deletar', () => {
    it('deve deletar recompensa com sucesso e retornar status 204', async () => {
      const req = mockRequest({}, { id: '1' });
      recompensaService.deletar.mockResolvedValueOnce();
      await recompensaController.deletar(req, res);
      expect(recompensaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('deve retornar erro ao tentar deletar recompensa inexistente', async () => {
      const req = mockRequest({}, { id: '999' });
      const erroMock: MockError = { id: 404, msg: 'Recompensa não encontrada' };
      recompensaService.deletar.mockRejectedValue(erroMock);
      await recompensaController.deletar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recompensa não encontrada' });
    });
        
  });

});