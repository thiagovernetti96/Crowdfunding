import { Repository } from "typeorm";
import { Categoria } from "../../Model/categoria";
import { CategoriaService } from "../../Service/CategoriaService"
import {describe, expect,it,beforeEach,jest} from '@jest/globals';

const mockCategoriaRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('CategoriaService', () => {
  let categoriaService: CategoriaService;
  let categoriaRepository: Repository<Categoria>;

  beforeEach(() => {
    categoriaRepository = mockCategoriaRepository as unknown as Repository<Categoria>;
    categoriaService = new CategoriaService(categoriaRepository);
    jest.clearAllMocks();
  });

  describe('inserir', () => {
    it('deve inserir uma categoria com sucesso', async () => {
      const categoria: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.save.mockReturnValueOnce(categoria);
      const result = await categoriaService.inserir(categoria);
      expect(result).toEqual(categoria);
      expect(mockCategoriaRepository.save).toHaveBeenCalledWith(categoria);
    });

    it('deve lançar erro quando nome não é fornecido', async () => {
      const categoria: any = { id: 1, nome: '' };
      await expect(categoriaService.inserir(categoria))
      .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
      expect(mockCategoriaRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando nome é undefined', async () => {
      const categoria: any = { id: 1, nome: undefined };
      await expect(categoriaService.inserir(categoria))
      .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
    });

    it('deve lançar erro quando nome é null', async () => {
      const categoria: any = { id: 1, nome: null };
      await expect(categoriaService.inserir(categoria))
      .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
    });
  });

  describe('listar', () => {
    it('deve retornar lista de categorias', async () => {
      const categorias: Categoria[] = [
        { id: 1, nome: 'Electrónicos' },
        { id: 2, nome: 'Roupas' }
      ];
      mockCategoriaRepository.find.mockReturnValueOnce(categorias);  
      const result = await categoriaService.listar();
      expect(result).toEqual(categorias);
      expect(mockCategoriaRepository.find).toHaveBeenCalled();
    });

    it('deve retornar array vazio quando não há categorias', async () => {
      mockCategoriaRepository.find.mockReturnValueOnce([]);
      const result = await categoriaService.listar();
      expect(result).toEqual([]);
    });
  });

  describe('buscarporId', () => {
    it('deve retornar categoria quando encontrada', async () => {
      const categoria: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
      const result = await categoriaService.buscarporId(1);
      expect(result).toEqual(categoria);
      expect(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar erro quando categoria não é encontrada', async () => {
  
      mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);


      await expect(categoriaService.buscarporId(999))
        .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
    });
  });

  describe('buscarporNome', () => {
    it('deve retornar categoria quando encontrada por nome', async () => {

      const categoria: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);

      const result = await categoriaService.buscarporNome('Electrónicos');

      expect(result).toEqual(categoria);
      expect(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Electrónicos' } });
    });

    it('deve lançar erro quando categoria não é encontrada por nome', async () => {
      mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);

      await expect(categoriaService.buscarporNome('Inexistente'))
        .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
    });
  });

  describe('atualizar', () => {
    it('deve atualizar categoria com sucesso', async () => {
      const categoriaExistente: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.findOne.mockReturnValueOnce(categoriaExistente);
      const categoriaAtualizada: Categoria = { id: 1, nome: 'Eletrodomésticos' };      
      mockCategoriaRepository.save.mockReturnValueOnce(categoriaAtualizada);
      const result = await categoriaService.atualizar(1, categoriaAtualizada);

      expect(result).toEqual({ id: 1, nome: 'Eletrodomésticos' });
      expect(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar erro ao tentar atualizar categoria inexistente', async () => {
      mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
      const categoriaAtualizada: Categoria = { id: 999, nome: 'Inexistente' };
      await expect(categoriaService.atualizar(999, categoriaAtualizada))
        .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
    });
  });

  describe('deletar', () => {
    it('deve deletar categoria com sucesso', async () => {
      // Arrange
      const categoria: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
      mockCategoriaRepository.remove.mockReturnValueOnce(undefined);
      await categoriaService.deletar(1);
      expect(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockCategoriaRepository.remove).toHaveBeenCalledWith(categoria);
    });

    it('deve lançar erro ao tentar deletar categoria inexistente', async () => {
      mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(categoriaService.deletar(999))
        .rejects.toEqual({ id: 404, msg: "pessoaJuridica não encontrada" });
    });

    it('deve verificar se remove foi chamado com a categoria correta', async () => {
      const categoria: Categoria = { id: 1, nome: 'Electrónicos' };
      mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
      await categoriaService.deletar(1);
      expect(mockCategoriaRepository.remove).toHaveBeenCalledWith(categoria);
    });
  });
});