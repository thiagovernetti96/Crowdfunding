import { Request, Response } from 'express';
import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { PessoaFisicaService } from "../../Service/PessoaFisicaService";
import { PessoaFisicaController } from "../../Controller/PessoaFisicaController";

const mockPessoaFisicaService = {
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

describe('PessoaFisicaController', () => {
  let pessoaFisicaController: PessoaFisicaController;
  let pessoaFisicaService: jest.Mocked<PessoaFisicaService>;
  let res: Response;

  beforeEach(() => {
    pessoaFisicaService = mockPessoaFisicaService as unknown as jest.Mocked<PessoaFisicaService>;
    pessoaFisicaController = new PessoaFisicaController(pessoaFisicaService);
    res = mockResponse();
  });
  describe('inserir', () => {
    it('deve inserir pessoa fisica com sucesso e retornar status 201', async () => {
      const req = mockRequest({ nome: 'João Silva', cpf: '123.456.789-00' });
      const pessoaFisicaMock = { id: 1, nome: 'João Silva', cpf: '123.456.789-00' };
      pessoaFisicaService.inserir.mockResolvedValue(pessoaFisicaMock);
      await pessoaFisicaController.inserir(req, res);
      expect(pessoaFisicaService.inserir).toHaveBeenCalledWith({ nome: 'João Silva', cpf: '123.456.789-00' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
    });
    it('deve tratar erro ao inserir pessoa fisica e retornar status 400', async () => {
      const req = mockRequest({ nome: '', cpf: 'invalid-cpf' });
      const errorMock: MockError = { id: 1, msg: 'Dados inválidos' };
      pessoaFisicaService.inserir.mockRejectedValue(errorMock);
      await pessoaFisicaController.inserir(req, res);
      expect(pessoaFisicaService.inserir).toHaveBeenCalledWith({ nome: '', cpf: 'invalid-cpf' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  
  describe('listar', () => {
    it('deve listar todas as pessoas fisicas e retornar status 200', async () => {
      const req = mockRequest();
      const pessoasFisicasMock = [
        { id: 1, nome: 'João Silva', cpf: '123.456.789-00' },
        { id: 2, nome: 'Maria Souza', cpf: '987.654.321-00' }
      ];
      pessoaFisicaService.listar.mockResolvedValue(pessoasFisicasMock);
      await pessoaFisicaController.listar(req, res);
      expect(pessoaFisicaService.listar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoasFisicasMock);
    });
  });
  describe('buscarporId', () => {
    it('deve buscar pessoa fisica por id e retornar status 200', async () => {
      const req = mockRequest(undefined, { id: '1' });
      const pessoaFisicaMock = { id: 1, nome: 'João Silva', cpf: '123.456.789-00' };
      pessoaFisicaService.buscarporId.mockResolvedValue(pessoaFisicaMock);
      await pessoaFisicaController.buscarporId(req, res);
      expect(pessoaFisicaService.buscarporId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
    });
    it('deve tratar erro ao buscar pessoa fisica por id e retornar status 404', async () => {
      const req = mockRequest(undefined, { id: '999' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa física não encontrada' };
      pessoaFisicaService.buscarporId.mockRejectedValue(errorMock);
      await pessoaFisicaController.buscarporId(req, res);
      expect(pessoaFisicaService.buscarporId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('buscarporNome', () => {
    it('deve buscar pessoas fisicas por nome e retornar status 200', async () => {
      const req = mockRequest({}, { nome: 'João' });
      const pessoaFisicaMock  = { id: 1, nome: 'João', cpf: '123.456.789-00' };
      pessoaFisicaService.buscarporNome.mockResolvedValue(pessoaFisicaMock);
      await pessoaFisicaController.buscarporNome(req, res);
      expect(pessoaFisicaService.buscarporNome).toHaveBeenCalledWith('João');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([pessoaFisicaMock]);
    });
    it('deve tratar erro ao buscar pessoas fisicas por nome e retornar status 500', async () => {
      const req = mockRequest(undefined, { nome: 'João' });
      const errorMock: MockError = { id: 500, msg: 'Erro interno' };
      pessoaFisicaService.buscarporNome.mockRejectedValue(errorMock);
      await pessoaFisicaController.buscarporNome(req, res);
      expect(pessoaFisicaService.buscarporNome).toHaveBeenCalledWith('João');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
    });
  });
  describe('atualizar', () => {
    it('deve atualizar pessoa fisica com sucesso e retornar status 200', async () => {
      const req = mockRequest({ nome: 'João Atualizado', cpf: '123.456.789-00' }, { id: '1' });
      const pessoaFisicaMock = { id: 1, nome: 'João Atualizado', cpf: '123.456.789-00' };
      pessoaFisicaService.atualizar.mockResolvedValue(pessoaFisicaMock);
      await pessoaFisicaController.atualizar(req, res);
      expect(pessoaFisicaService.atualizar).toHaveBeenCalledWith(1, { nome: 'João Atualizado', cpf: '123.456.789-00' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
    });
    it('deve tratar erro ao atualizar pessoa fisica e retornar status 400', async () => {
      const req = mockRequest({ nome: '', cpf: 'invalid-cpf' }, { id: '1' });
      const errorMock: MockError = { id: 400, msg: 'Dados inválidos' };
      pessoaFisicaService.atualizar.mockRejectedValue(errorMock);
      await pessoaFisicaController.atualizar(req, res);
      expect(pessoaFisicaService.atualizar).toHaveBeenCalledWith(1, { nome: '', cpf: 'invalid-cpf' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('deletar', () => {
    it('deve deletar pessoa fisica com sucesso e retornar status 204', async () => {
      const req = mockRequest(undefined, { id: '1' });
      pessoaFisicaService.deletar.mockResolvedValue(undefined);
      await pessoaFisicaController.deletar(req, res);
      expect(pessoaFisicaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).not.toHaveBeenCalled();
    });
    it('deve tratar erro ao deletar pessoa fisica e retornar status 404', async () => {
      const req = mockRequest(undefined, { id: '999' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa física não encontrada' };
      pessoaFisicaService.deletar.mockRejectedValue(errorMock);
      await pessoaFisicaController.deletar(req, res);
      expect(pessoaFisicaService.deletar).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
});
