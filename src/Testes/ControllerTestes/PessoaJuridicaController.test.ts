import { Request,Response } from "express";
import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { PessoaJuridicaService } from "../../Service/PessoaJuridicaService";
import { PessoaJuridicaController } from "../../Controller/PessoaJuridicaController";

const mockPessoaJuridicaService = {
  inserir: jest.fn(),
  listar: jest.fn(),
  buscarPorId: jest.fn(),
  buscarPorNome: jest.fn(),
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

describe('PessoaJuridicaController', () => {
  let pessoaJuridicaController: PessoaJuridicaController;
  let pessoaJuridicaService: jest.Mocked<PessoaJuridicaService>;
  let res: Response;

  beforeEach(() => {
    pessoaJuridicaService = mockPessoaJuridicaService as unknown as jest.Mocked<PessoaJuridicaService>;
    pessoaJuridicaController = new PessoaJuridicaController(pessoaJuridicaService);
    res = mockResponse();
  });
  describe('inserir', () => {
    it('deve inserir pessoa juridica com sucesso e retornar status 200', async () => {
      const req = mockRequest({ nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' });
      pessoaJuridicaService.inserir.mockResolvedValue({ id: 1, ...req.body });
      await pessoaJuridicaController.inserir(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });
    it('deve tratar erro ao inserir pessoa juridica e retornar status 400', async () => {
      const req = mockRequest({ nome: '', cnpj: 'invalid-cnpj', email: 'invalid-email', senha: '', razao_social: '' });
      const errorMock: MockError = { id: 1, msg: 'Dados inválidos' };
      pessoaJuridicaService.inserir.mockRejectedValue(errorMock);
      await pessoaJuridicaController.inserir(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao inserir pessoa jurídica" });
    });
  });
  
  describe('listar', () => {
    it('deve listar pessoas juridicas com sucesso e retornar status 200', async () => {
      const req = mockRequest();
      const pessoasJuridicasMock = [
        { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' },
      ];
      pessoaJuridicaService.listar.mockResolvedValueOnce(pessoasJuridicasMock);
      await pessoaJuridicaController.listar(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoasJuridicasMock);
    });
  });
  describe('buscarporId', () => {
    it('deve buscar pessoa juridica por id com sucesso e retornar status 200', async () => {
      const req = mockRequest(undefined, { id: '1' });
      const pessoaJuridicaMock = { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
      pessoaJuridicaService.buscarporId.mockResolvedValue(pessoaJuridicaMock);
      await pessoaJuridicaController.buscarporId(req, res);
      expect(pessoaJuridicaService.buscarporId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
    });
    it('deve retornar erro quando Pessoa Jurídica não encontrada', async () => {
      const req = mockRequest({}, { id: '999' });
      const erroMock: MockError = { id: 404, msg: 'Pessoa jurídica não encontrada' };
      pessoaJuridicaService.buscarporId.mockRejectedValue(erroMock);
      await pessoaJuridicaController.buscarporId(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Pessoa jurídica não encontrada' });
    });
  });
  describe('buscarporNome', () => {
    it('deve buscar pessoa juridica por nome com sucesso e retornar status 200', async () => {
      const req = mockRequest({}, { nome: 'Empresa X' });
      const pessoaJuridicaMock = { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
      pessoaJuridicaService.buscarporNome.mockResolvedValue(pessoaJuridicaMock);
      await pessoaJuridicaController.buscarporNome(req, res);
      expect(pessoaJuridicaService.buscarporNome).toHaveBeenCalledWith('Empresa X');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
    });
 it('deve retornar erro quando pessoa jurídica não encontrada por nome', async () => {
      const req = mockRequest({}, { nome: 'Inexistente' });
      const erroMock: MockError = { id: 404, msg: 'Pessoa jurídica não encontrada' };
      pessoaJuridicaService.buscarporNome.mockRejectedValue(erroMock);
      await pessoaJuridicaController.buscarporNome(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 404 });
    });
  });
  describe('atualizar', () => {
    it('deve atualizar pessoa juridica com sucesso e retornar status 200', async () => {
      const req = mockRequest({ id: 1, nome: 'Empresa Y', cnpj: '98765432000188', email: 'contato@empresay.com', senha: 'senha456', razao_social: 'Empresa Y Ltda' });
      const pessoaJuridicaMock = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188', email: 'contato@empresay.com', senha: 'senha456', razao_social: 'Empresa Y Ltda' };
      pessoaJuridicaService.atualizar.mockResolvedValueOnce(pessoaJuridicaMock);
      await pessoaJuridicaController.atualizar(req, res);
      expect(pessoaJuridicaService.atualizar).toHaveBeenCalledWith(1, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
    });
    it('deve tratar erro ao atualizar pessoa juridica e retornar status 400', async () => {
      const req = mockRequest({ id: 999, nome: 'Empresa Inexistente', cnpj: '00000000000000', email: 'invalid-email', senha: '', razao_social: '' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa jurídica não encontrada' };
      pessoaJuridicaService.atualizar.mockRejectedValue(errorMock);
      await pessoaJuridicaController.atualizar(req, res);
      expect(pessoaJuridicaService.atualizar).toHaveBeenCalledWith(999, req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar pessoa jurídica" });
    });
  });
  describe('deletar', () => {
    it('deve deletar pessoa juridica com sucesso e retornar status 204', async () => {
      const req = mockRequest(undefined, { id: '1' });
      pessoaJuridicaService.deletar.mockResolvedValueOnce();
      await pessoaJuridicaController.deletar(req, res);
      expect(pessoaJuridicaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('deve tratar erro ao deletar pessoa juridica e retornar status 400', async () => {
      const req = mockRequest(undefined, { id: '999' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa jurídica não encontrada' };
      pessoaJuridicaService.deletar.mockRejectedValue(errorMock);
      await pessoaJuridicaController.deletar(req, res);
      expect(pessoaJuridicaService.deletar).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao deletar pessoa jurídica" });
    });
  });
});