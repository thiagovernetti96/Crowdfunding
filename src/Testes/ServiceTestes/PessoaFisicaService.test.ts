import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { PessoaFisica } from '../../Model/pessoa_fisica';
import { PessoaFisicaService } from '../../Service/PessoaFisicaService'
import { Repository } from 'typeorm';

const mockPessoaFisicaRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('PessoaFisicaService', () => {
  let pessoaFisicaService: PessoaFisicaService;
  let pessoaFisicaRepository: Repository<PessoaFisica>;

  beforeEach(() => {
    pessoaFisicaRepository = mockPessoaFisicaRepository as unknown as Repository<PessoaFisica>;
    pessoaFisicaService = new PessoaFisicaService(pessoaFisicaRepository);
    jest.clearAllMocks();
  });
  describe('inserir', () => {
    it('deve inserir uma pessoa física com sucesso', async () => {
      const pessoa_fisica: PessoaFisica = { id: 1, nome: 'João', cpf: '12345678900', 
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      mockPessoaFisicaRepository.save.mockReturnValueOnce(pessoa_fisica);

      const result = await pessoaFisicaService.inserir(pessoa_fisica);
      expect(result).toEqual(pessoa_fisica);
      expect(mockPessoaFisicaRepository.save).toHaveBeenCalledWith(pessoa_fisica);
    });

    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const pessoa_fisica: any = { id: 1, nome: '', cpf: '12345678900', 
      data_nascimento: new Date('1990-01-01'), email: '' };
      await expect(pessoaFisicaService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando nome é undefined', async () => {
      const pessoa_fisica: any = { id: 1, nome: undefined, cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      await expect(pessoaFisicaService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é null', async () => {
      const pessoa_fisica: any = { id: 1, nome: null, cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      await expect(pessoaFisicaService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
    }); 
  });

  describe('atualizar', () => { 
    it('deve atualizar uma pessoa física existente', async () => {
      const pessoa_fisica_existente: PessoaFisica = { id: 1, nome: 'João', cpf: '12345678900', 
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica_existente);
      const pessoa_fisica_atualizada: PessoaFisica = { id: 1, nome: 'João Silva', cpf: '12345678900', 
      data_nascimento: new Date('1990-01-01'), email: 'joao.silva@example.com' };
      mockPessoaFisicaRepository.save.mockReturnValueOnce(pessoa_fisica_atualizada);
      const result = await pessoaFisicaService.atualizar(1, pessoa_fisica_atualizada);
      expect(result).toEqual(pessoa_fisica_atualizada);
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando pessoa física não é encontrada para atualização', async () => {
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
      const pessoa_fisica_atualizada: PessoaFisica = { id: 1, nome: 'João Silva', cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao.silva@example.com' };
      await expect(pessoaFisicaService.atualizar(1, pessoa_fisica_atualizada))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('listar', () => {
    it('deve retornar lista de pessoas físicas', async () => {
      const pessoas_fisicas: PessoaFisica[] = [
        { id: 1, nome: 'João', cpf: '12345678900', data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' },
        { id: 2, nome: 'Maria', cpf: '09876543211', data_nascimento: new Date('1992-02-02'), email: 'maria@example.com' }
      ];
      mockPessoaFisicaRepository.find.mockReturnValueOnce(pessoas_fisicas);
      const result = await pessoaFisicaService.listar();
      expect(result).toEqual(pessoas_fisicas);
      expect(mockPessoaFisicaRepository.find).toHaveBeenCalled();
    });
    it('deve retornar array vazio quando não há pessoas físicas', async () => {
      mockPessoaFisicaRepository.find.mockReturnValueOnce([]);
      const result = await pessoaFisicaService.listar();
      expect(result).toEqual([]);
      expect(mockPessoaFisicaRepository.find).toHaveBeenCalled();
    });
  });

  describe('Buscar por Id', () => {
    it('deve encontrar pessoa física por id existente', async () => {
      const pessoa_fisica: PessoaFisica = { id: 1, nome: 'João', cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      const result = await pessoaFisicaService.buscarporId(1);
      expect(result).toEqual(pessoa_fisica);
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro para id não existente', async () => {
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(pessoaFisicaService.buscarporId(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('Buscar por Nome', () => {
    it('deve encontrar pessoa física por nome existente', async () => {
      const pessoa_fisica: PessoaFisica = { id: 1, nome: 'João', cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      const result = await pessoaFisicaService.buscarporNome('João');
      expect(result).toEqual(pessoa_fisica);
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'João' } });
    });
    it('deve lançar erro para nome não existente', async () => {
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(pessoaFisicaService.buscarporNome('Inexistente'))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Inexistente' } });
    });
  });

  describe('deletar', () => {
    it('deve deletar pessoa física existente', async () => {
      const pessoa_fisica: PessoaFisica = { id: 1, nome: 'João', cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      await pessoaFisicaService.deletar(1);
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockPessoaFisicaRepository.remove).toHaveBeenCalledWith(pessoa_fisica);
    });

    it('deve lançar erro ao tentar deletar pessoa física não existente', async () => {
      mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
      await expect(pessoaFisicaService.deletar(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(mockPessoaFisicaRepository.remove).not.toHaveBeenCalled();
    });
  });
});