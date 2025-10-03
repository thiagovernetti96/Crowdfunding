import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { PessoaJuridica } from '../../Model/pessoa_juridica';
import { PessoaJuridicaService } from '../../Service/PessoaJuridicaService'
import { Repository } from 'typeorm';

const mockPessoaJuridicaRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('PessoaJuridicaService', () => {
  let pessoaJuridicaService: PessoaJuridicaService;
  let pessoaJuridicaRepository: Repository<PessoaJuridica>;

  beforeEach(() => {
    pessoaJuridicaRepository = mockPessoaJuridicaRepository as unknown as Repository<PessoaJuridica>;
    pessoaJuridicaService = new PessoaJuridicaService(pessoaJuridicaRepository);
    jest.clearAllMocks();
  });
  describe('inserir', () => {
    it('deve inserir uma pessoa jurídica com sucesso', async () => {
      const pessoa_juridica: PessoaJuridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
       email: 'contato@empresax.com',senha:'senha123',razao_social:'Empresa X Ltda' };
      mockPessoaJuridicaRepository.save.mockReturnValueOnce(pessoa_juridica);

      const result = await pessoaJuridicaService.inserir(pessoa_juridica);
      expect(result).toEqual(pessoa_juridica);
      expect(mockPessoaJuridicaRepository.save).toHaveBeenCalledWith(pessoa_juridica);
    });
    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const pessoa_juridica: any = { id: 1, nome: '', cnpj: '12345678000199',
       email: '' };
      await expect(pessoaJuridicaService.inserir(pessoa_juridica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando nome é undefined', async () => {
      const pessoa_juridica: any = { id: 1, nome: undefined, cnpj: '12345678000199',
       email: 'contato@empresax.com' };
      await expect(pessoaJuridicaService.inserir(pessoa_juridica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é null', async () => {
      const pessoa_juridica: any = { id: 1, nome: null, cnpj: '12345678000199',
       email: 'contato@empresax.com' };
      await expect(pessoaJuridicaService.inserir(pessoa_juridica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('atualizar', () => { 
   it('deve atualizar uma pessoa juridica existente', async () => {
      const pessoa_juridica_existente: PessoaJuridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
      razao_social: 'Empresa X Ltda', email: 'contato@empresax.com',senha:'senha123' };
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica_existente);
      const pessoa_juridica_atualizada: PessoaJuridica = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188',
      razao_social: 'Empresa Y Ltda', email: 'contato@empresay.com',senha:'senha456' };
      mockPessoaJuridicaRepository.save.mockReturnValueOnce(pessoa_juridica_atualizada);
      const result = await pessoaJuridicaService.atualizar(1, pessoa_juridica_atualizada);
      expect(result).toEqual(pessoa_juridica_atualizada);
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro ao tentar atualizar uma pessoa jurídica inexistente', async () => {
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
      const pessoa_juridica_atualizada: PessoaJuridica = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188',
      email: 'contato@empresay.com',senha:'senha456',razao_social:'Empresa Y Ltda' };
      await expect(pessoaJuridicaService.atualizar(1, pessoa_juridica_atualizada))
        .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('buscarporId', () => {
    it('deve retornar uma pessoa jurídica existente por ID', async () => {
      const pessoa_juridica: PessoaJuridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
       email: 'contato@empresax.com' };
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica);

      const result = await pessoaJuridicaService.buscarporId(1);
      expect(result).toEqual(pessoa_juridica);
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando pessoa jurídica não é encontrada por ID', async () => {
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(pessoaJuridicaService.buscarporId(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
  describe('listar', () => {
    it('deve retornar lista de pessoas jurídicas', async () => {
      const pessoas_juridicas: PessoaJuridica[] = [
        { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
         email: 'contato@empresax.com' },
        { id: 2, nome: 'Empresa Y', cnpj: '98765432000188',
         email: 'contato@empresay.com' }
      ];
      mockPessoaJuridicaRepository.find.mockReturnValueOnce(pessoas_juridicas);

      const result = await pessoaJuridicaService.listar();
      expect(result).toEqual(pessoas_juridicas);
      expect(mockPessoaJuridicaRepository.find).toHaveBeenCalled();
    });
  });
  describe('deletar', () => {
    it('deve deletar uma pessoa jurídica existente', async () => {
      const pessoa_juridica: PessoaJuridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
      email: 'contato@empresax.com',senha:'senha123',razao_social:'Empresa X Ltda' };
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica);

      const result = await pessoaJuridicaService.deletar(1);
      expect(result).toBe(undefined);
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockPessoaJuridicaRepository.remove).toHaveBeenCalledWith(pessoa_juridica);
    });

    it('deve lançar erro ao tentar deletar uma pessoa jurídica inexistente', async () => {
      mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(pessoaJuridicaService.deletar(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
      expect(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(mockPessoaJuridicaRepository.remove).not.toHaveBeenCalled();
    });
  });
});