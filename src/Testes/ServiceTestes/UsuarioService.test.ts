import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import { Usuario } from '../../Model/usuario';
import { UsuarioService } from '../../Service/UsuarioService'
import { Repository } from 'typeorm';

const mockUsuarioRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};

describe('UsuarioService', () => {
  let usuarioService:UsuarioService;
  let usuarioRepository: Repository<Usuario>;

  beforeEach(() => {
    usuarioRepository = mockUsuarioRepository as unknown as Repository<Usuario>;
    usuarioService = new UsuarioService(usuarioRepository);
    jest.clearAllMocks();
  });
  describe('inserir', () => {
    it('deve inserir uma pessoa física com sucesso', async () => {
      const pessoa_fisica: Usuario = { id: 1, nome: 'João', email: 'joao@example.com' };
      mockUsuarioRepository.save.mockReturnValueOnce(pessoa_fisica);

      const result = await usuarioService.inserir(pessoa_fisica);
      expect(result).toEqual(pessoa_fisica);
      expect(mockUsuarioRepository.save).toHaveBeenCalledWith(pessoa_fisica);
    });

    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const pessoa_fisica: any = { id: 1, nome: '', email: '' };
      await expect(usuarioService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockUsuarioRepository.save).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando nome é undefined', async () => {
      const pessoa_fisica: any = { id: 1, nome: undefined, cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      await expect(usuarioService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockUsuarioRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é null', async () => {
      const pessoa_fisica: any = { id: 1, nome: null, cpf: '12345678900',
      data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
      await expect(usuarioService.inserir(pessoa_fisica))
        .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
      expect(mockUsuarioRepository.save).not.toHaveBeenCalled();
    }); 
  });

  describe('atualizar', () => { 
    it('deve atualizar uma pessoa física existente', async () => {
      const pessoa_fisica_existente: Usuario = { id: 1, nome: 'João', email: 'joao@example.com' };
      mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica_existente);
      const pessoa_fisica_atualizada: Usuario = { id: 1, nome: 'João Silva', email: 'joao.silva@example.com' };
      mockUsuarioRepository.save.mockReturnValueOnce(pessoa_fisica_atualizada);
      const result = await usuarioService.atualizar(1, pessoa_fisica_atualizada);
      expect(result).toEqual(pessoa_fisica_atualizada);
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando pessoa física não é encontrada para atualização', async () => {
      mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
      const pessoa_fisica_atualizada: Usuario = { id: 1, nome: 'João Silva', email: 'joao.silva@example.com' };
      await expect(usuarioService.atualizar(1, pessoa_fisica_atualizada))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockUsuarioRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('listar', () => {
    it('deve retornar lista de pessoas físicas', async () => {
      const pessoas_fisicas: Usuario[] = [
        { id: 1, nome: 'João',email: 'joao@example.com' },
        { id: 2, nome: 'Maria',email: 'maria@example.com' }
      ];
      mockUsuarioRepository.find.mockReturnValueOnce(pessoas_fisicas);
      const result = await usuarioService.listar();
      expect(result).toEqual(pessoas_fisicas);
      expect(mockUsuarioRepository.find).toHaveBeenCalled();
    });
    it('deve retornar array vazio quando não há pessoas físicas', async () => {
      mockUsuarioRepository.find.mockReturnValueOnce([]);
      const result = await usuarioService.listar();
      expect(result).toEqual([]);
      expect(mockUsuarioRepository.find).toHaveBeenCalled();
    });
  });

  describe('Buscar por Id', () => {
    it('deve encontrar pessoa física por id existente', async () => {
      const pessoa_fisica: Usuario = { id: 1, nome: 'João',  email: 'joao@example.com' };
      mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      const result = await usuarioService.buscarporId(1)
      expect(result).toEqual(pessoa_fisica);
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro para id não existente', async () => {
      mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
      await expect(usuarioService.buscarporId(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('Buscar por Nome', () => {
    it('deve encontrar pessoa física por nome existente', async () => {
      const pessoa_fisica: Usuario = { id: 1, nome: 'João', email: 'joao@example.com' };
      mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      const result = await usuarioService.buscarporNome('João');
      expect(result).toEqual(pessoa_fisica);
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'João' } });
    });
    it('deve lançar erro para nome não existente', async () => {
     mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
      await expect(usuarioService.buscarporNome('Inexistente'))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Inexistente' } });
    });
  });

  describe('deletar', () => {
    it('deve deletar pessoa física existente', async () => {
      const pessoa_fisica: Usuario = { id: 1, nome: 'João',email: 'joao@example.com' };
     mockUsuarioRepository.findOne.mockReturnValueOnce(pessoa_fisica);
      await usuarioService.deletar(1);
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockUsuarioRepository.remove).toHaveBeenCalledWith(pessoa_fisica);
    });

    it('deve lançar erro ao tentar deletar pessoa física não existente', async () => {
     mockUsuarioRepository.findOne.mockReturnValueOnce(undefined);
      await expect(usuarioService.deletar(999))
        .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(mockUsuarioRepository.remove).not.toHaveBeenCalled();
    });
  });
});