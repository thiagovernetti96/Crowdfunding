import { Request, Response } from 'express';
import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { UsuarioService } from "../../Service/UsuarioService";
import { UsuarioController } from '../../Controller/UsuarioController';

const mockUsuarioService = {
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

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: jest.Mocked<UsuarioService>;
  let res: Response;

  beforeEach(() => {
    usuarioService = mockUsuarioService as unknown as jest.Mocked<UsuarioService>;
    usuarioController = new  UsuarioController(usuarioService);
    res = mockResponse();
  });
  describe('inserir', () => {
    it('deve inserir pessoa fisica com sucesso e retornar status 201', async () => {
      const req = mockRequest({ nome: 'João Silva' });
      const usuarioMock = { id: 1, nome: 'João Silva'};
      usuarioService.inserir.mockResolvedValue(usuarioMock);
      await usuarioController.inserir(req, res);
      expect(usuarioService.inserir).toHaveBeenCalledWith({ nome: 'João Silva' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(usuarioMock);
    });
    it('deve tratar erro ao inserir pessoa fisica e retornar status 400', async () => {
      const req = mockRequest({ nome: '', cpf: 'invalid-cpf' });
      const errorMock: MockError = { id: 1, msg: 'Dados inválidos' };
      usuarioService.inserir.mockRejectedValue(errorMock);
      await usuarioController.inserir(req, res);
      expect(usuarioService.inserir).toHaveBeenCalledWith({ nome: '' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  
  describe('listar', () => {
    it('deve listar todas as pessoas fisicas e retornar status 200', async () => {
      const req = mockRequest();
      const pessoasFisicasMock = [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Souza'}
      ];
      usuarioService.listar.mockResolvedValue(pessoasFisicasMock);
      await usuarioController.listar(req, res);
      expect(usuarioService.listar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pessoasFisicasMock);
    });
  });
  describe('buscarporId', () => {
    it('deve buscar pessoa fisica por id e retornar status 200', async () => {
      const req = mockRequest(undefined, { id: '1' });
      const usuarioMock = { id: 1, nome: 'João Silva' };
      usuarioService.buscarporId.mockResolvedValue(usuarioMock);
      await usuarioController.buscarporId(req, res);
      expect(usuarioService.buscarporId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarioMock);
    });
    it('deve tratar erro ao buscar pessoa fisica por id e retornar status 404', async () => {
      const req = mockRequest(undefined, { id: '999' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa física não encontrada' };
      usuarioService.buscarporId.mockRejectedValue(errorMock);
      await usuarioController.buscarporId(req, res);
      expect(usuarioService.buscarporId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('buscarporNome', () => {
    it('deve buscar pessoas fisicas por nome e retornar status 200', async () => {
      const req = mockRequest({}, { nome: 'João' });
      const usuarioMock  = { id: 1, nome: 'João'};
      usuarioService.buscarporNome.mockResolvedValue(usuarioMock);
      await usuarioController.buscarporNome(req, res);
      expect(usuarioService.buscarporNome).toHaveBeenCalledWith('João');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([usuarioMock]);
    });
    it('deve tratar erro ao buscar pessoas fisicas por nome e retornar status 500', async () => {
      const req = mockRequest(undefined, { nome: 'João' });
      const errorMock: MockError = { id: 500, msg: 'Erro interno' };
      usuarioService.buscarporNome.mockRejectedValue(errorMock);
      await usuarioController.buscarporNome(req, res);
      expect(usuarioService.buscarporNome).toHaveBeenCalledWith('João');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
    });
  });
  describe('atualizar', () => {
    it('deve atualizar pessoa fisica com sucesso e retornar status 200', async () => {
      const req = mockRequest({ nome: 'João Atualizado' }, { id: '1' });
      const usuarioMock = { id: 1, nome: 'João Atualizado' };
     usuarioService.atualizar.mockResolvedValue(usuarioMock);
      await usuarioController.atualizar(req, res);
      expect(usuarioService.atualizar).toHaveBeenCalledWith(1, { nome: 'João Atualizado'});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarioMock);
    });
    it('deve tratar erro ao atualizar pessoa fisica e retornar status 400', async () => {
      const req = mockRequest({ nome: '', cpf: 'invalid-cpf' }, { id: '1' });
      const errorMock: MockError = { id: 400, msg: 'Dados inválidos' };
     usuarioService.atualizar.mockRejectedValue(errorMock);
      await usuarioController.atualizar(req, res);
      expect(usuarioService.atualizar).toHaveBeenCalledWith(1, { nome: '' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('deletar', () => {
    it('deve deletar pessoa fisica com sucesso e retornar status 204', async () => {
      const req = mockRequest(undefined, { id: '1' });
     usuarioService.deletar.mockResolvedValue(undefined);
      await usuarioController.deletar(req, res);
      expect(usuarioService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).not.toHaveBeenCalled();
    });
    it('deve tratar erro ao deletar pessoa fisica e retornar status 404', async () => {
      const req = mockRequest(undefined, { id: '999' });
      const errorMock: MockError = { id: 404, msg: 'Pessoa física não encontrada' };
      usuarioService.deletar.mockRejectedValue(errorMock);
      await usuarioController.deletar(req, res);
      expect(usuarioService.deletar).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });
});
