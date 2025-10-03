import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { Recompensa } from '../../Model/recompensa';
import { Produto } from '../../Model/produto';
import { RecompensaService } from '../../Service/RecompensaService'
import { Repository } from 'typeorm';

const mockRecompensaRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('RecompensaService', () => {
  let recompensaService: RecompensaService;
  let recompensaRepository: Repository<Recompensa>;
  beforeEach(() => {
    recompensaRepository = mockRecompensaRepository as unknown as Repository<Recompensa>;
    recompensaService = new RecompensaService(recompensaRepository);
    jest.clearAllMocks();
  });
  describe('inserir', () => {
    it('deve inserir uma recompensa com sucesso', async () => {
      const recompensa: Recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0,quantidade_maxima:100,produto:{nome:'Produto A'} };
      mockRecompensaRepository.save.mockReturnValueOnce(recompensa);
      const result = await recompensaService.inserir(recompensa);
      expect(result).toEqual(recompensa);
      expect(mockRecompensaRepository.save).toHaveBeenCalledWith(recompensa);
    });
    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const recompensa: any = { id: 1, nome: '', descricao: 'Descrição da Recompensa A', valor_minimo: undefined };
      await expect(recompensaService.inserir(recompensa))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
      expect(mockRecompensaRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é undefined', async () => {
      const recompensa: any = { id: 1, nome: undefined, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
      await expect(recompensaService.inserir(recompensa))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
      expect(mockRecompensaRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é null', async () => {
      const recompensa: any = { id: 1, nome: null, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
      await expect(recompensaService.inserir(recompensa))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
      expect(mockRecompensaRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('atualizar', () => {
    it('deve atualizar uma recompensa existente', async () => {
      const recompensa_existente: Recompensa = { id: 1, nome: 'Recompensa A', produto:{nome:'Produto A'}, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0,quantidade_maxima:100 };
      const recompensa_atualizada: Recompensa = { id: 1, nome: 'Recompensa B', produto:{nome:'Produto B'}, descricao: 'Descrição da Recompensa B', valor_minimo: 75.0,quantidade_maxima:150 };
      mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa_existente);
      mockRecompensaRepository.save.mockReturnValueOnce(recompensa_atualizada);
      const result = await recompensaService.atualizar(1, recompensa_atualizada);
      expect(result).toEqual(recompensa_atualizada);
      expect(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando a recompensa não existe', async () => {
      mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
      const recompensa_atualizada: Recompensa = { id: 1, nome: 'Recompensa B', descricao: 'Descrição da Recompensa B', valor_minimo: 75.0 };
      await expect(recompensaService.atualizar(1, recompensa_atualizada))
        .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
      expect(mockRecompensaRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('deletar', () => {
    it('deve deletar uma recompensa existente', async () => {
      const recompensa_existente: Recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0,quantidade_maxima:100,produto:{nome:'Produto A'} };
      mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa_existente);
      await recompensaService.deletar(1);
      expect(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRecompensaRepository.remove).toHaveBeenCalledWith(recompensa_existente);
    });
    it('deve lançar erro quando a recompensa não existe', async () => {
      mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(recompensaService.deletar(1))
        .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
      expect(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRecompensaRepository.remove).not.toHaveBeenCalled();
    });
  });
  describe('listar', () => {
    it('deve listar todas as recompensas', async () => {
      const recompensas: Recompensa[] = [
        { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 },
        { id: 2, nome: 'Recompensa B', descricao: 'Descrição da Recompensa B', valor_minimo: 75.0 }
      ];
      mockRecompensaRepository.find.mockReturnValueOnce(recompensas);
      const result = await recompensaService.listar();
      expect(result).toEqual(recompensas);
      expect(mockRecompensaRepository.find).toHaveBeenCalled();
    });
  });
  describe('buscarporId', () => {
    it('deve retornar uma recompensa existente por ID', async () => {
      const recompensa: Recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
      mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa);
      const result = await recompensaService.buscarporId(1);
      expect(result).toEqual(recompensa);
      expect(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando recompensa não é encontrada por ID', async () => {
      mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(recompensaService.buscarporId(999))
        .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
      expect(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
  describe('buscarPorNome', () => {
    it('deve buscar recompensas por nome', async () => {
      const recompensa: Recompensa= {  id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0, quantidade_maxima: 100, produto: { nome: 'Produto A' } }
      mockRecompensaRepository.find.mockReturnValueOnce([recompensa]);
      const result = await recompensaService.buscarporNome('Recompensa A');
      expect(result).toEqual([recompensa]);
      expect(mockRecompensaRepository.find).toHaveBeenCalledWith({ where: { nome: 'Recompensa A' } });
    });
  });

});
