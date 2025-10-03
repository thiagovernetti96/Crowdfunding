import { Request, Response } from 'express';
import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { CategoriaService } from "../../Service/CategoriaService";
import { CategoriaController } from "../../Controller/CategoriaController";

const mockCategoriaService = {
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

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn((code: number) => res) as unknown as (code: number) => Response;
  res.json = jest.fn((data?: any) => res) as unknown as (data?: any) => Response;
  res.send = jest.fn((data?: any) => res) as unknown as (data?: any) => Response;
  return res as Response;
};

const mockRequest = (body?: any, params?: any) => {
  return {
    body,
    params
  } as Request;
};

describe('CategoriaController', () => {
  let categoriaController: CategoriaController;
  let categoriaService: jest.Mocked<CategoriaService>;
  let res: Response;

  beforeEach(() => {
    categoriaService = mockCategoriaService as unknown as jest.Mocked<CategoriaService>;
    categoriaController = new CategoriaController(categoriaService);
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('inserir', () => {
    it('deve inserir categoria com sucesso e retornar status 201', async () => {
      const req = mockRequest({ nome: 'Electrónicos' });
      const categoriaMock = { id: 1, nome: 'Electrónicos' };
      categoriaService.inserir.mockResolvedValue(categoriaMock);
      await categoriaController.inserir(req, res);
      expect(categoriaService.inserir).toHaveBeenCalledWith({ nome: 'Electrónicos' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(categoriaMock);
    });

    it('deve retornar erro 400 quando service lançar exceção', async () => {
      const req = mockRequest({ nome: '' });
      const erroMock: MockError = { id: 400, msg: 'O nome da categoria é obrigatório' };
      categoriaService.inserir.mockRejectedValue(erroMock);
      await categoriaController.inserir(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O nome da categoria é obrigatório' });
    });

    it('deve tratar erro quando nome é undefined', async () => {

      const req = mockRequest({ nome: undefined });
      const erroMock: MockError = { id: 400, msg: 'O nome da categoria é obrigatório' };
      categoriaService.inserir.mockRejectedValue(erroMock);
      await categoriaController.inserir(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O nome da categoria é obrigatório' });
    });
  });

  describe('listar', () => {
    it('deve retornar lista de categorias com status 200', async () => {
      const req = mockRequest();
      const categoriasMock = [
        { id: 1, nome: 'Electrónicos' },
        { id: 2, nome: 'Roupas' }
      ];
      categoriaService.listar.mockResolvedValue(categoriasMock);
      await categoriaController.listar(req, res);
      expect(categoriaService.listar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categoriasMock);
    });

    it('deve retornar erro quando service falhar', async () => {
      const req = mockRequest();
      const erroMock: MockError = { id: 500, msg: 'Erro interno' };
      categoriaService.listar.mockRejectedValue(erroMock);
      await categoriaController.listar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
    });
  });

  describe('buscarporId', () => {
    it('deve retornar categoria por ID com status 200', async () => {
      const req = mockRequest({}, { id: '1' });
      const categoriaMock = { id: 1, nome: 'Electrónicos' };
      categoriaService.buscarporId.mockResolvedValue(categoriaMock);
      await categoriaController.buscarporId(req, res);
      expect(categoriaService.buscarporId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categoriaMock);
    });

    it('deve retornar erro quando categoria não encontrada', async () => {
      const req = mockRequest({}, { id: '999' });
      const erroMock: MockError = { id: 400, msg: 'Categoria não encontrada' };
      categoriaService.buscarporId.mockRejectedValue(erroMock);
      await categoriaController.buscarporId(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
    });
  });

  describe('buscarporNome', () => {
    it('deve retornar categoria por nome com status 200', async () => {
      const req = mockRequest({}, { nome: 'Electrónicos' });
      const categoriaMock = { id: 1, nome: 'Electrónicos' };
      categoriaService.buscarporNome.mockResolvedValue(categoriaMock);
      await categoriaController.buscarporNome(req, res);
      expect(categoriaService.buscarporNome).toHaveBeenCalledWith('Electrónicos');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categoriaMock);
    });

    it('deve retornar erro quando categoria não encontrada por nome', async () => {
      const req = mockRequest({}, { nome: 'Inexistente' });
      const erroMock: MockError = { id: 404, msg: 'Categoria não encontrada' };
      categoriaService.buscarporNome.mockRejectedValue(erroMock);
      await categoriaController.buscarporNome(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 404 });
    });
  });

  describe('atualizar', () => {
    it('deve atualizar categoria com sucesso', async () => {
      const req = mockRequest({ nome: 'Eletrodomésticos' }, { id: '1' });
      const categoriaAtualizadaMock = { id: 1, nome: 'Eletrodomésticos' };
      categoriaService.atualizar.mockResolvedValue(categoriaAtualizadaMock);
      await categoriaController.atualizar(req, res);
      expect(categoriaService.atualizar).toHaveBeenCalledWith(1, { nome: 'Eletrodomésticos' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categoriaAtualizadaMock);
    });

    it('deve retornar erro quando categoria não encontrada para atualizar', async () => {
      const req = mockRequest({ nome: 'Novo Nome' }, { id: '999' });
      const erroMock: MockError = { id: 400, msg: 'Categoria não encontrada' };
      categoriaService.atualizar.mockRejectedValue(erroMock);
      await categoriaController.atualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
    });
  });

  describe('deletar', () => {
    it('deve deletar categoria com sucesso e retornar status 204', async () => {
      const req = mockRequest({}, { id: '1' });
      categoriaService.deletar.mockResolvedValue(undefined);
      await categoriaController.deletar(req, res);
      expect(categoriaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('deve retornar erro ao tentar deletar categoria inexistente', async () => {
      const req = mockRequest({}, { id: '999' });
      const erroMock: MockError = { id: 404, msg: 'Categoria não encontrada' };
      categoriaService.deletar.mockRejectedValue(erroMock);
      await categoriaController.deletar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
    });
  });
});